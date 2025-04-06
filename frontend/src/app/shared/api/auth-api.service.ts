import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CreateUserDto } from '@dto/create-user.dto';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '@const/tokens';
import { CommonSuccessResponceDto } from '@dto/common-success-response.dto';
import { GenerateEmailConfirmResponseDto } from '@dto/generate-email-confirm-response.dto';
import { LoginRequestDto } from '@dto/login-request.dto';
import { LoginResponseDto } from '@dto/login-response.dto';
import { ValidateEmailDto } from '@dto/validate-email.dto';

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

  loginUser(params: LoginRequestDto): Observable<LoginResponseDto> {
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
  ): Observable<CommonSuccessResponceDto> {
    return this.http.post<CommonSuccessResponceDto>(
      `${this.baseUrl}/email-confirm`,
      { linkHash },
    );
  }

  validateEmail(
    params: ValidateEmailDto,
  ): Observable<CommonSuccessResponceDto> {
    return this.http.post<CommonSuccessResponceDto>(
      `${this.baseUrl}/email-confirm/validate`,
      params,
    );
  }

  // By this endpoint we do first auth check in angular auth.guard on server.
  checkAuth(): Observable<any> {
    console.log('request');

    return this.http.get(`${this.baseUrl}/auth/check-auth`, {
      responseType: 'text',
    });
  }
}
