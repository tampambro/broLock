import { Body, Controller, Post } from '@nestjs/common';
import { CommonSuccessResponceDto } from '@dto/common-success-response.dto';
import { GenerateEmailConfirmResponseDto } from '@dto/generate-email-confirm-response.dto';
import { GenerateEmailConfirmRequestDto } from '@dto/generate-email-confirm-request.dto';
import { ValidateEmailDto } from '@dto/validate-email.dto';
import { EmailConfirmService } from './email-confirm.service';

@Controller('email-confirm')
export class EmailConfirmController {
  constructor(private emailConfirmSrv: EmailConfirmService) {}

  @Post()
  async checkEmailConfirmItem(
    @Body() params: GenerateEmailConfirmRequestDto,
  ): Promise<CommonSuccessResponceDto> {
    await this.emailConfirmSrv.checkEmailConfirmItem(params.linkHash);

    return { status: 'ok' };
  }

  @Post('new-confirm')
  async generateNewEmailConfirm(
    @Body() params: GenerateEmailConfirmRequestDto,
  ): Promise<GenerateEmailConfirmResponseDto> {
    const newLinkHash = await this.emailConfirmSrv.sendNewEmailConfirm(
      params.linkHash,
    );

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
