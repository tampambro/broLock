import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommonSuccessResponceDto } from '@dto/common-success-response.dto';
import { GenerateEmailConfirmDto } from '@dto/generate-email-confirm.dto';
import { ValidateEmailDto } from '@dto/validate-email.dto';
import { EmailConfirmService } from './email-confirm.service';

@Controller('email-confirm')
export class EmailConfirmController {
  constructor(private emailConfirmSrv: EmailConfirmService) {}

  @Get()
  async checkEmailConfirmItem(
    linkHash: string,
  ): Promise<CommonSuccessResponceDto> {
    await this.emailConfirmSrv.checkEmailConfirmItem(linkHash);

    return { status: 'ok' };
  }

  @Post()
  async generateEmailConfirm(
    userName: string,
  ): Promise<GenerateEmailConfirmDto> {
    const linkHash = await this.emailConfirmSrv.sendEmailConfirm(userName);

    return { linkHash };
  }

  @Post('new-confirm')
  async generateNewEmailConfirm(
    linkHash: string,
  ): Promise<GenerateEmailConfirmDto> {
    const newLinkHash = await this.emailConfirmSrv.sendEmailConfirm(linkHash);

    return { linkHash: newLinkHash };
  }

  @Post('validate')
  async validateEmail(
    @Body() params: ValidateEmailDto,
  ): Promise<CommonSuccessResponceDto> {
    await this.emailConfirmSrv.validateEmail(params);

    return { status: 'ok' };
  }
}
