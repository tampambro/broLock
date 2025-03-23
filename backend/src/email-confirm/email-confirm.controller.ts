import { Body, Controller, Post } from '@nestjs/common';
import { CommonSuccessResponceDto } from '@dto/common-success-response.dto';
import { GenerateEmailConfirmResponseDto } from '@dto/generate-email-confirm-response.dto';
import { ValidateEmailDto } from '@dto/validate-email.dto';
import { EmailConfirmService } from './email-confirm.service';

@Controller('email-confirm')
export class EmailConfirmController {
  constructor(private emailConfirmSrv: EmailConfirmService) {}

  @Post()
  async checkEmailConfirmItem(
    linkHash: string,
  ): Promise<CommonSuccessResponceDto> {
    await this.emailConfirmSrv.checkEmailConfirmItem(linkHash);

    return { status: 'ok' };
  }

  @Post('new-confirm')
  async generateNewEmailConfirm(
    linkHash: string,
  ): Promise<GenerateEmailConfirmResponseDto> {
    const newLinkHash =
      await this.emailConfirmSrv.sendNewEmailConfirm(linkHash);

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
