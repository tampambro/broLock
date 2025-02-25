import {
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { generateOtp } from '@helpers/generate-otp';
import { EmailConfirm } from './email-confirm.entity';
import { UserService } from 'src/user/user.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class EmailConfirmService {
  private readonly minRequestIntervalMin = 1;
  private readonly tokenExpireationMin = 15;
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
        createdAt: MoreThan(
          new Date(
            createTime.getTime() - this.minRequestIntervalMin * 60 * 1000,
          ),
        ),
      },
    });

    if (recentToken) {
      throw new UnprocessableEntityException(
        'Please wait before requesting a new token',
      );
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
      throw new NotFoundException('User not found');
    }

    if (user.isMailConfirm) {
      throw new UnprocessableEntityException('Email already confirm');
    }

    const otp = await this.createEmailConfirmOtp(user.id);

    this.emailSrv.sendEmail({
      subject: 'BroLock — account confirm',
      recipients: [{ name: user.name, address: user.email }],
      html: this.emailSrv.confirmEmailTemplate(user.name, otp),
    });
  }

  async checkEmailConfirm(userName: string): Promise<boolean> {
    const user = await this.userSrv.findOne(userName);

    if (!user || user.isMailConfirm) {
      return false;
    }

    const emailConfirm = await this.emailConfirmRepository.findOneBy({ user });

    console.log(emailConfirm);

    return true;
  }
}
