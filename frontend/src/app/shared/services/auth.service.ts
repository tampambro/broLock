import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '@api/auth-api.service';
import { TOASTER_EVENT_ENUM } from '@bro-src-types/enum';
import { ToasterService } from '@components/toaster/toaster.service';
import { LoginRequestDto } from '@dto/login-request.dto';
import { LoginResponseDto } from '@dto/login-response.dto';
import { RefreshTokenResponseDto } from '@dto/refresh-token-response.dto';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private cookieSrv = inject(SsrCookieService);
  private router = inject(Router);
  private authApiSrv = inject(AuthApiService);
  private toasterSrv = inject(ToasterService);
  private userSrv = inject(UserService);

  private _isLogin$ = new BehaviorSubject<boolean>(this.isClientLogin);

  get isLogin() {
    return this._isLogin$;
  }

  private get isClientLogin(): boolean {
    return !!(
      this.cookieSrv.get('access_token') ||
      this.cookieSrv.get('refresh_token') ||
      this.cookieSrv.get('userId')
    );
  }

  login(params: LoginRequestDto): Observable<LoginResponseDto> {
    return this.authApiSrv.login(params).pipe(
      tap(res => {
        this.cookieSetToken(res.access_token, res.refresh_token);
        this.cookieSrv.set('userId', res.userId.toString(), {
          secure: true,
          sameSite: 'Strict',
        });

        this._isLogin$.next(true);
      }),
    );
  }

  logout(): void {
    const refreshToken = this.cookieSrv.get('refresh_token');
    if (refreshToken) {
      this.authApiSrv.logout({ refreshToken }).subscribe({
        next: () => {
          this.toasterSrv.addToast({
            eventType: TOASTER_EVENT_ENUM.SUCCESS,
            text: 'またね！ (See you soon)',
          });
        },
      });
    }

    this.router.navigate(['/login']);
    this._isLogin$.next(false);
    this.cookieSrv.deleteAll();
    this.userSrv.setUserInfo(null);
  }

  refreshToken(): Observable<RefreshTokenResponseDto> {
    return this.authApiSrv.refreshToken({
      refreshToken: this.cookieSrv.get('refresh_token'),
    });
  }

  cookieSetToken(access_token: string, refresh_token: string): void {
    this.cookieSrv.set('access_token', access_token);
    this.cookieSrv.set('refresh_token', refresh_token);
  }
}
