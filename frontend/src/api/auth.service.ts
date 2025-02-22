import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CreateUserDto } from '@dto/create-user.dto';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../constants/tokens';
import { CommonAddResponseDto } from '@dto/common-add-response.dto';
import { CommonSuccessResponceDto } from '@dto/common-success-response.dto';

@Injectable()
export class AuthService {
  private readonly baseUrl = inject(BASE_API_URL);
  private http = inject(HttpClient);

  createUser(params: CreateUserDto): Observable<CommonAddResponseDto> {
    return this.http.post<CommonAddResponseDto>(
      `${this.baseUrl}/auth/singup`,
      params,
    );
  }

  createCodeEmailConfirm(userId: number): Observable<CommonSuccessResponceDto> {
    return this.http.post<CommonSuccessResponceDto>(
      `${this.baseUrl}/email-confirm`,
      userId,
    );
  }
}
