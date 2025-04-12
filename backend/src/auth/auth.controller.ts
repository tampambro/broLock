import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from '@dto/create-user.dto';
import { LoginRequestDto } from '@dto/login-request.dto';
import { AuthService } from './auth.service';
import { GenerateEmailConfirmResponseDto } from '@dto/generate-email-confirm-response.dto';
import { CommonSuccessResponceDto } from '@dto/common-success-response.dto';
import { RefreshTokenRequestDto } from '@dto/refresh-token-request.dto';
import { RefreshTokenResponseDto } from '@dto/refresh-token-response.dto';
import { LogoutRequestDto } from '@dto/logout-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private authSrv: AuthService) {}

  @HttpCode(201)
  @Post('signup')
  async singup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<GenerateEmailConfirmResponseDto> {
    return await this.authSrv.signup(createUserDto);
  }

  @HttpCode(200)
  @Post('login')
  login(@Body() loginParams: LoginRequestDto) {
    return this.authSrv.login(loginParams);
  }

  @HttpCode(200)
  @Post('logout')
  async logout(
    @Body() params: LogoutRequestDto,
  ): Promise<CommonSuccessResponceDto> {
    await this.authSrv.logout(params.refreshToken);

    return { status: 'ok' };
  }

  @HttpCode(200)
  @Post('refresh')
  async refreshToken(
    @Body() refreshTokenParams: RefreshTokenRequestDto,
  ): Promise<RefreshTokenResponseDto> {
    return await this.authSrv.refreshToken(refreshTokenParams.refreshToken);
  }
}
