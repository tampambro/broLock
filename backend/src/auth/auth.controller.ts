import { Body, Controller, HttpCode, Post, Query } from '@nestjs/common';
import { CreateUserDto } from '@dto/auth/create-user.dto';
import { LoginRequestDto } from '@dto/auth/login-request.dto';
import { AuthService } from './auth.service';
import { GenerateEmailConfirmResponseDto } from '@dto/email/generate-email-confirm-response.dto';
import { CommonSuccessResponseDto } from '@dto/common-success-response.dto';
import { RefreshTokenRequestDto } from '@dto/auth/refresh-token-request.dto';
import { RefreshTokenResponseDto } from '@dto/auth/refresh-token-response.dto';
import { LogoutRequestDto } from '@dto/auth/logout-request.dto';
import { ForgotPasswordRequestDto } from '@dto/auth/forgot-password-request.dto';
import { ResetPasswordRequestDto } from '@dto/auth/reset-password-request.dto';
import { commonSuccessResponse } from '@const/common-success-response';

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
  ): Promise<CommonSuccessResponseDto> {
    await this.authSrv.logout(params.refreshToken);

    return commonSuccessResponse;
  }

  @HttpCode(200)
  @Post('refresh')
  async refreshToken(
    @Body() refreshTokenParams: RefreshTokenRequestDto,
  ): Promise<RefreshTokenResponseDto> {
    return await this.authSrv.refreshToken(refreshTokenParams.refreshToken);
  }

  @HttpCode(200)
  @Post('forgot-password')
  async forgotPassword(
    @Body() params: ForgotPasswordRequestDto,
  ): Promise<CommonSuccessResponseDto> {
    this.authSrv.sendPasswordResetEmail(params);

    return commonSuccessResponse;
  }

  @HttpCode(200)
  @Post('reset-password')
  async resetPassword(
    @Query('linkToken') linkToken: string,
    @Body() params: ResetPasswordRequestDto,
  ): Promise<CommonSuccessResponseDto> {
    await this.authSrv.resetPassword(linkToken, params.password);

    return commonSuccessResponse;
  }
}
