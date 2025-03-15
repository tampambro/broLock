import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CommonSuccessResponceDto } from '@dto/common-success-response.dto';
import { ValidateEmailDto } from '@dto/validate-email.dto';
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

  @Post('validate')
  async validateEmail(
    @Body() params: ValidateEmailDto,
  ): Promise<CommonSuccessResponceDto> {
    const result = await this.emailConfirmSrv.validateEmail(params);

    if (!result) {
      throw new BadRequestException();
    }

    return { status: 'ok' };
  }
}
