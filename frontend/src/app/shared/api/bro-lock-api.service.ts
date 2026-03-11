import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_API_URL } from '@const/tokens';
import { CommonSuccessResponseDto } from '@dto/common-success-response.dto';
import { BroLockCreateRequestDto } from '@dto/bro-lock/bro-lock-manage/bro-lock-create-request.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BroLockApiService {
  private readonly baseUrl = inject(BASE_API_URL);
  private http = inject(HttpClient);

  createBroLock(
    params: BroLockCreateRequestDto
  ): Observable<CommonSuccessResponseDto> {
    return this.http.post<CommonSuccessResponseDto>(
      `${this.baseUrl}/bro-lock/create`,
      params
    );
  }
}