import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { UserInfoRequestDto } from '@dto/user/user-info-request.dto';
import { UserInfoResponseDto } from '@dto/user/user-info-response.dto';
import { SetBroPhraseRequest } from '@dto/user/set-bro-phrase-request.dto';
import { CommonSuccessResponseDto } from '@dto/common-success-response.dto';
import { commonSuccessResponse } from '@const/common-success-response';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('info')
  async getUserInfo(
    @Body() params: UserInfoRequestDto,
  ): Promise<UserInfoResponseDto> {
    return await this.userService.getUserInfo(params);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('phrase')
  async setBroPhrase(
    @Body() params: SetBroPhraseRequest,
  ): Promise<CommonSuccessResponseDto> {
    await this.userService.setBroPhrase(params);
    return commonSuccessResponse;
  }
}
