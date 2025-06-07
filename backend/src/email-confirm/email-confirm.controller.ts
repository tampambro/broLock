import { Body, Controller, Post } from '@nestjs/common';
import { CommonSuccessResponseDto } from '@dto/common-success-response.dto';
import { GenerateEmailConfirmResponseDto } from '@dto/email/generate-email-confirm-response.dto';
import { GenerateEmailConfirmRequestDto } from '@dto/email/generate-email-confirm-request.dto';
import { ValidateEmailDto } from '@dto/email/validate-email.dto';
import { EmailConfirmService } from './email-confirm.service';
import { commonSuccessResponse } from '@const/common-success-response';

@Controller('email-confirm')
export class EmailConfirmController {
  constructor(private emailConfirmSrv: EmailConfirmService) {}

  @Post()
  async checkEmailConfirmItem(
    @Body() params: GenerateEmailConfirmRequestDto,
  ): Promise<CommonSuccessResponseDto> {
    await this.emailConfirmSrv.checkEmailConfirmItem(params.linkHash);

    return commonSuccessResponse;
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
  ): Promise<CommonSuccessResponseDto> {
    await this.emailConfirmSrv.validateEmail(params);

    return commonSuccessResponse;
  }
}
