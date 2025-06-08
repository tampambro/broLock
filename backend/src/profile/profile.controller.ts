import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ActiveBroLocksRequest } from '@dto/profile/active-bro-locks-request.dto';
import { ActiveBroLocksResponse } from '@dto/profile/active-bro-locks-response.dto';
import { CommonSuccessResponseDto } from '@dto/common-success-response.dto';
import { commonSuccessResponse } from '@const/common-success-response';
import { ProfileInfoRequestDto } from '@dto/profile/profile-info-request.dto';
import { ProfileInfoResponseDto } from '@dto/profile/profile-info-response.dto';
import { SetBroPhraseRequestDto } from '@dto/profile/set-bro-phrase-request.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileSrv: ProfileService) {}

  // @HttpCode(200)
  // @UseGuards(JwtAuthGuard)
  // @Post()
  // async getActiveBroLocks(
  //   @Body() params: ActiveBroLocksRequest,
  // ): Promise<ActiveBroLocksResponse> {
  //   return await this.profileService.getActiveBroLocks(params);
  // }

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
