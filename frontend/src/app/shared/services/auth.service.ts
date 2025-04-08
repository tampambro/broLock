import { EventEmitter, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '@api/auth-api.service';
import { TOASTER_EVENT_ENUM } from '@bro-src-types/enum';
import { ToasterService } from '@components/toaster/toaster.service';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

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
    return !!this.cookieSrv.get('access_token');
  }

  logout(): void {
    const userId = +this.cookieSrv.get('userId');
    if (+this.cookieSrv.get('userId')) {
      this.authApiSrv.logout(userId).subscribe({
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
}
