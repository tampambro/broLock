import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { generateOtp } from '@helpers/generate-otp';
import { EmailConfirm } from './email-confirm.entity';
import { UserService } from 'src/user/user.service';
import { EmailService } from 'src/email/email.service';
import { ValidateEmailDto } from '@dto/validate-email.dto';

@Injectable()
export class EmailConfirmService {
  private readonly minRequestIntervalMin = 5;
  private readonly tokenExpireationMin = 10;
  private readonly saltRounds = 10;

  constructor(
    @InjectRepository(EmailConfirm)
    private emailConfirmRepository: Repository<EmailConfirm>,
    private userSrv: UserService,
    private emailSrv: EmailService,
  ) {}

  private async createEmailConfirmOtp(
    userId: number,
  ): Promise<{ otp: string; linkHash: string }> {
    let emailConfirmItem = await this.emailConfirmRepository.findOne({
      where: {
        user: { id: userId },
      },
    });

    if (emailConfirmItem) {
      throw new BadRequestException();
    } else {
      emailConfirmItem = this.emailConfirmRepository.create({
        user: { id: userId },
        token: await bcrypt.hash(generateOtp(), this.saltRounds),
        linkHash: await bcrypt.hash(generateOtp(9), this.saltRounds),
        expiresAt: new Date(
          new Date().getTime() + this.tokenExpireationMin * 60 * 1000,
        ),
        email: emailConfirmItem.email,
      });
      await this.emailConfirmRepository.save(emailConfirmItem);
    }

    return {
      otp: emailConfirmItem.token,
      linkHash: emailConfirmItem.linkHash,
    };
  }

  async sendEmailConfirm(userName: string): Promise<string> {
    const user = await this.userSrv.findOne(userName);

    if (!user) {
      throw new BadRequestException();
    }

    if (user.isMailConfirm) {
      throw new BadRequestException();
    }

    const { otp, linkHash } = await this.createEmailConfirmOtp(user.id);

    this.emailSrv.sendEmail({
      subject: 'BroLock — account confirm',
      recipients: [{ name: user.name, address: user.email }],
      html: this.emailSrv.confirmEmailTemplate(user.name, otp, linkHash),
    });

    return linkHash;
  }

  async sendNewEmailConfirm(linkHash: string): Promise<string> {
    const emailConfirmItem = await this.emailConfirmRepository.findOneBy({
      linkHash,
    });

    if (!emailConfirmItem) {
      throw new BadRequestException();
    }

    const isTime =
      new Date().getTime() >
      emailConfirmItem.createdAt.getTime() +
        this.minRequestIntervalMin * 60 * 1000;

    if (!isTime) {
      throw new BadRequestException('It is not time yet');
    }

    emailConfirmItem.expiresAt = new Date(
      new Date().getTime() + this.tokenExpireationMin * 60 * 1000,
    );
    emailConfirmItem.token = await bcrypt.hash(generateOtp(), this.saltRounds);
    emailConfirmItem.linkHash = await bcrypt.hash(
      generateOtp(9),
      this.saltRounds,
    );

    await this.emailConfirmRepository.save(emailConfirmItem);

    this.emailSrv.sendEmail({
      subject: 'BroLock — account confirm',
      recipients: [{ name: 'Bro', address: emailConfirmItem.email }],
      html: this.emailSrv.confirmEmailTemplate(
        'Bro',
        emailConfirmItem.token,
        emailConfirmItem.linkHash,
      ),
    });

    return emailConfirmItem.linkHash;
  }

  async validateEmail(params: ValidateEmailDto): Promise<void> {
    const { otp, linkHash } = params;
    const emailConfirm = await this.emailConfirmRepository.findOneBy({
      linkHash,
    });

    if (!emailConfirm) {
      throw new BadRequestException();
    }

    const isEmailConfirmValid =
      emailConfirm &&
      (await bcrypt.compare(otp, emailConfirm.token)) &&
      new Date().getTime() < new Date(emailConfirm.expiresAt).getTime();

    if (!isEmailConfirmValid) {
      throw new BadRequestException();
    }

    await this.emailConfirmRepository.remove(emailConfirm);
  }

  async checkEmailConfirmItem(linkHash: string): Promise<void> {
    const emailConfirm = await this.emailConfirmRepository.findOneBy({
      linkHash,
    });

    if (!emailConfirm) {
      throw new BadRequestException();
    }
  }
}
