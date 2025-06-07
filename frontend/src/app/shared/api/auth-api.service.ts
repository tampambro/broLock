import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CreateUserDto } from '@dto/auth/create-user.dto';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '@const/tokens';
import { CommonSuccessResponseDto } from '@dto/common-success-response.dto';
import { GenerateEmailConfirmResponseDto } from '@dto/email/generate-email-confirm-response.dto';
import { LoginRequestDto } from '@dto/auth/login-request.dto';
import { LoginResponseDto } from '@dto/auth/login-response.dto';
import { ValidateEmailDto } from '@dto/email/validate-email.dto';
import { RefreshTokenRequestDto } from '@dto/auth/refresh-token-request.dto';
import { RefreshTokenResponseDto } from '@dto/auth/refresh-token-response.dto';
import { LogoutRequestDto } from '@dto/auth/logout-request.dto';
import { ForgotPasswordRequestDto } from '@dto/auth/forgot-password-request.dto';
import { ResetPasswordRequestDto } from '@dto/auth/reset-password-request.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly baseUrl = inject(BASE_API_URL);
  private http = inject(HttpClient);

  createUser(
    params: CreateUserDto,
  ): Observable<GenerateEmailConfirmResponseDto> {
    return this.http.post<GenerateEmailConfirmResponseDto>(
      `${this.baseUrl}/auth/signup`,
      params,
    );
  }

  login(params: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(
      `${this.baseUrl}/auth/login`,
      params,
    );
  }

  createNewCodeEmailConfirm(
    linkHash: string,
  ): Observable<GenerateEmailConfirmResponseDto> {
    return this.http.post<GenerateEmailConfirmResponseDto>(
      `${this.baseUrl}/email-confirm/new-confirm`,
      { linkHash },
    );
  }

  checkEmailConfirmItem(
    linkHash: string,
  ): Observable<CommonSuccessResponseDto> {
    return this.http.post<CommonSuccessResponseDto>(
      `${this.baseUrl}/email-confirm`,
      { linkHash },
    );
  }

  validateEmail(
    params: ValidateEmailDto,
  ): Observable<CommonSuccessResponseDto> {
    return this.http.post<CommonSuccessResponseDto>(
      `${this.baseUrl}/email-confirm/validate`,
      params,
    );
  }

  logout(params: LogoutRequestDto): Observable<CommonSuccessResponseDto> {
    return this.http.post<CommonSuccessResponseDto>(
      `${this.baseUrl}/auth/logout`,
      params,
    );
  }

  refreshToken(
    params: RefreshTokenRequestDto,
  ): Observable<RefreshTokenResponseDto> {
    return this.http.post<RefreshTokenResponseDto>(
      `${this.baseUrl}/auth/refresh`,
      params,
    );
  }

  sendEmailForgotPassword(
    params: ForgotPasswordRequestDto,
  ): Observable<CommonSuccessResponseDto> {
    return this.http.post<CommonSuccessResponseDto>(
      `${this.baseUrl}/auth/forgot-password`,
      params,
    );
  }

  resetPassword(
    linkToken: string,
    params: ResetPasswordRequestDto,
  ): Observable<CommonSuccessResponseDto> {
    return this.http.post<CommonSuccessResponseDto>(
      `${this.baseUrl}/auth/reset-password?linkToken=${linkToken}`,
      params,
    );
  }
}
