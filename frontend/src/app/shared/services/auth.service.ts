import { EventEmitter, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '@api/auth-api.service';
import { TOASTER_EVENT_ENUM } from '@bro-src-types/enum';
import { ToasterService } from '@components/toaster/toaster.service';
import { RefreshTokenResponseDto } from '@dto/refresh-token-response.dto';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private cookieSrv = inject(SsrCookieService);
  private router = inject(Router);
  private authApiSrv = inject(AuthApiService);
  private toasterSrv = inject(ToasterService);

  logoutEvent = new EventEmitter<void>();

  get isLogin(): boolean {
    return !!(
      this.cookieSrv.get('access_token') || this.cookieSrv.get('refresh_token')
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
    this.logoutEvent.emit();
    this.cookieSrv.deleteAll();
  }

  refreshToken(): Observable<RefreshTokenResponseDto> {
    return this.authApiSrv.refreshToken({
      refreshToken: this.cookieSrv.get('refresh_token'),
    });
  }
}
