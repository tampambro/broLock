import { BadRequestException, Controller, Post } from '@nestjs/common';
import { CommonSuccessResponceDto } from '@dto/common-success-response.dto';
import { EmailConfirmService } from './email-confirm.service';

@Controller('email-confirm')
export class EmailConfirmController {
  constructor(private emailConfirmSrv: EmailConfirmService) {}

  @Post()
  async generateEmailConfirm(
    userName: string,
  ): Promise<CommonSuccessResponceDto> {
    await this.emailConfirmSrv.sendEmailConfirm(userName);

    return { status: 'ok' };
  }

  @Post('check')
  async checkEmailConfirm(userName: string): Promise<CommonSuccessResponceDto> {
    const result = await this.emailConfirmSrv.checkEmailConfirm(userName);

    if (!result) {
      throw new BadRequestException();
    }

    return { status: 'ok' };
  }
}
