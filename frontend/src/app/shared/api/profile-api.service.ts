import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_API_URL } from '@const/tokens';
import { Observable } from 'rxjs';
import { ProfileRequestDto } from '@dto/profile/profile-request.dto';
import { ProfileResponseDto } from '@dto/profile/profile-response.dto';
import { CommonSuccessResponseDto } from '@dto/common-success-response.dto';
import { SetBroPhraseRequestDto } from '@dto/profile/set-bro-phrase-request.dto';
import { ProfileInfoRequestDto } from '@dto/profile/profile-info-request.dto';
import { ProfileInfoResponseDto } from '@dto/profile/profile-info-response.dto';

@Injectable({ providedIn: 'root' })
export class ProfileApiService {
  private readonly baseUrl = inject(BASE_API_URL);
  private http = inject(HttpClient);

  getProfile(params: ProfileRequestDto): Observable<ProfileResponseDto> {
    return this.http.post<ProfileResponseDto>(
      `${this.baseUrl}/profile`,
      params,
    );
  }

  setBroPhrase(
    params: SetBroPhraseRequestDto,
  ): Observable<CommonSuccessResponseDto> {
    return this.http.post<CommonSuccessResponseDto>(
      `${this.baseUrl}/profile/phrase`,
      params,
    );
  }

  getProfileInfo(
    params: ProfileInfoRequestDto,
  ): Observable<ProfileInfoResponseDto> {
    return this.http.post<ProfileInfoResponseDto>(
      `${this.baseUrl}/profile/info`,
      params,
    );
  }
}
