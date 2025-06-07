import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_API_URL } from '@const/tokens';
import { Observable } from 'rxjs';
import { UserInfoResponseDto } from '@dto/user/user-info-response.dto';
import { UserInfoRequestDto } from '@dto/user/user-info-request.dto';
import { CommonSuccessResponseDto } from '@dto/common-success-response.dto';
import { SetBroPhraseRequest } from '@dto/user/set-bro-phrase-request.dto';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private readonly baseUrl = inject(BASE_API_URL);
  private http = inject(HttpClient);

  getUserInfo(params: UserInfoRequestDto): Observable<UserInfoResponseDto> {
    return this.http.post<UserInfoResponseDto>(
      `${this.baseUrl}/user/info`,
      params,
    );
  }

  setBroPhrase(
    params: SetBroPhraseRequest,
  ): Observable<CommonSuccessResponseDto> {
    return this.http.post<CommonSuccessResponseDto>(
      `${this.baseUrl}/user/phrase`,
      params,
    );
  }
}
