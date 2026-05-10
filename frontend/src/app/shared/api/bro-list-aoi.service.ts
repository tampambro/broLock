import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_API_URL } from '@const/tokens';
import { BroListReqDto } from '@dto/bro-list/bro-list-req.dto';
import { BroListResDto } from '@dto/bro-list/bro-list-res.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BroListyApiServicece {
  private readonly baseUrl = inject(BASE_API_URL);
  private http = inject(HttpClient);

  getCreatedList(
    { profileId, page = 1, size = 20 }: BroListReqDto
  ): Observable<BroListResDto> {
    return this.http.get<BroListResDto>(
      `${this.baseUrl}/bro-list/created/${profileId}?page=${page}&size=${size}`
    )
  }

  getAddedList(
    { profileId, page = 1, size = 20 }: BroListReqDto
  ): Observable<BroListResDto> {
    return this.http.get<BroListResDto>(
      `${this.baseUrl}/bro-list/added/${profileId}?page=${page}&size=${size}`
    )
  }

  getListsByState(
    { profileId, page = 1, size = 20, state }: BroListReqDto
  ): Observable<BroListResDto> {
    return this.http.get<BroListResDto>(
      `${this.baseUrl}/bro-list/${state}/${profileId}?page=${page}&size=${size}`
    )
  }
}