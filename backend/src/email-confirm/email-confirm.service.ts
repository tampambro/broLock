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
  private readonly tokenExpireationMin = 60;
  private readonly saltRounds = 10;

  constructor(
    @InjectRepository(EmailConfirm)
    private emailConfirmRepository: Repository<EmailConfirm>,
    private userSrv: UserService,
    private emailSrv: EmailService,
  ) {}

  private async createEmailConfirmOtp(userId: number): Promise<string> {
    const createTime = new Date();

    const recentToken = await this.emailConfirmRepository.findOne({
      where: {
        user: { id: userId },
      },
    });

    if (recentToken) {
      const isTime =
        new Date().getTime() >
        recentToken.createdAt.getTime() +
          this.minRequestIntervalMin * 60 * 1000;

      if (isTime) {
        await this.emailConfirmRepository.remove(recentToken);
      } else {
        throw new BadRequestException('It is not time yet');
      }
    }

    const otp = generateOtp();
    const hashedToken = await bcrypt.hash(otp, this.saltRounds);
    const confirmEntity = this.emailConfirmRepository.create({
      user: { id: userId },
      token: hashedToken,
      expiresAt: new Date(
        createTime.getTime() + this.tokenExpireationMin * 60 * 1000,
      ),
    });
    await this.emailConfirmRepository.save(confirmEntity);

    return otp;
  }

  async sendEmailConfirm(userName: string) {
    const user = await this.userSrv.findOne(userName);

    if (!user) {
      throw new BadRequestException();
    }

    if (user.isMailConfirm) {
      throw new BadRequestException();
    }

    const otp = await this.createEmailConfirmOtp(user.id);

    this.emailSrv.sendEmail({
      subject: 'BroLock — account confirm',
      recipients: [{ name: user.name, address: user.email }],
      html: this.emailSrv.confirmEmailTemplate(user.name, otp),
    });
  }

  async validateEmail(params: ValidateEmailDto): Promise<boolean> {
    const { userName, otp } = params;
    const user = await this.userSrv.findOne(userName);

    if (!user || user.isMailConfirm) {
      return false;
    }

    const emailConfirm = await this.emailConfirmRepository.findOneBy({ user });

    const isEmailConfirmValid =
      emailConfirm &&
      (await bcrypt.compare(otp, emailConfirm.token)) &&
      new Date().getTime() < new Date(emailConfirm.expiresAt).getTime();

    if (!isEmailConfirmValid) {
      return false;
    }

    await this.emailConfirmRepository.remove(emailConfirm);

    return true;
  }
}
