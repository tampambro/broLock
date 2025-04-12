import { inject, Injectable, OnDestroy } from '@angular/core';
import { UserInfoResponseDto } from '@dto/user-info-response.dto';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private cookieSrv = inject(SsrCookieService);

  private _userInfo$ = new Subject<UserInfoResponseDto | null>();

  get userId(): number {
    return +this.cookieSrv.get('userId');
  }

  getUserInfo(): Observable<UserInfoResponseDto | null> {
    return this._userInfo$;
  }

  setUserInfo(info: UserInfoResponseDto | null): void {
    this._userInfo$.next(info);
  }

  ngOnDestroy(): void {
    this._userInfo$.unsubscribe();
  }
}
