import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_API_URL } from '@const/tokens';
import { Observable } from 'rxjs';
import { UserInfoResponseDto } from '@dto/user-info-response.dto';
import { UserInfoRequestDto } from '@dto/user-info-request.dto';

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
}
