import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CommonSuccessResponseDto } from '@dto/common-success-response.dto';
import { commonSuccessResponse } from '@const/common-success-response';
import { ProfileInfoRequestDto } from '@dto/profile/profile-info-request.dto';
import { ProfileInfoResponseDto } from '@dto/profile/profile-info-response.dto';
import { SetBroPhraseRequestDto } from '@dto/profile/set-bro-phrase-request.dto';
import { ProfileRequestDto } from '@dto/profile/profile-request.dto';
import { ProfileResponseDto } from '@dto/profile/profile-response.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileSrv: ProfileService) {}

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post()
  async getProfile(
    @Body() params: ProfileRequestDto,
  ): Promise<ProfileResponseDto> {
    return await this.profileSrv.getProfile(params);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('info')
  async getProfileInfo(
    @Body() params: ProfileInfoRequestDto,
  ): Promise<ProfileInfoResponseDto> {
    return await this.profileSrv.getProfileInfo(params);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('phrase')
  async setBroPhrase(
    @Body() params: SetBroPhraseRequestDto,
  ): Promise<CommonSuccessResponseDto> {
    await this.profileSrv.setBroPhrase(params);
    return commonSuccessResponse;
  }
}
