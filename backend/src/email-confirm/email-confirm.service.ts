import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { generateOtp } from '@helpers/generate-otp';
import { EmailConfirm } from './email-confirm.entity';

@Injectable()
export class EmailConfirmService {
  private readonly minRequestIntervalMin = 1;
  private readonly tokenExpireationMin = 15;
  private readonly saltRounds = 10;

  constructor(
    @InjectRepository(EmailConfirm)
    private emailConfirmRepository: Repository<EmailConfirm>,
  ) {}

  async createEmailConfirmOtp(userId: number): Promise<string> {
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
}
