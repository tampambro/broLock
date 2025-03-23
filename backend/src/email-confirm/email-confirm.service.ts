import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { generateOtp } from '@helpers/generate-otp';
import { EmailConfirm } from './email-confirm.entity';
import { UserService } from 'src/user/user.service';
import { EmailService } from 'src/email/email.service';
import { ValidateEmailDto } from '@dto/validate-email.dto';
import { User } from 'src/user/user.entity';

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
    email: string,
  ): Promise<{ otp: string; linkHash: string }> {
    const emailConfirmItem = this.emailConfirmRepository.create({
      email,
      user: { id: userId },
      token: await bcrypt.hash(generateOtp(), this.saltRounds),
      linkHash: await bcrypt.hash(generateOtp(4), this.saltRounds),
      expiresAt: new Date(
        new Date().getTime() + this.tokenExpireationMin * 60 * 1000,
      ),
    });
    await this.emailConfirmRepository.save(emailConfirmItem);

    return {
      otp: emailConfirmItem.token,
      linkHash: emailConfirmItem.linkHash,
    };
  }

  async sendEmailConfirm(userId: number): Promise<string> {
    let user: User;

    try {
      user = await this.userSrv.findOne(userId);
    } catch (err) {
      console.error(err);
      throw new BadRequestException();
    }

    if (!user) {
      throw new BadRequestException();
    }

    if (user.isMailConfirm) {
      throw new BadRequestException();
    }

    const { otp, linkHash } = await this.createEmailConfirmOtp(
      user.id,
      user.email,
    );

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
      generateOtp(4),
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
