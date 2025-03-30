import { inject, Injectable } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private cookieSrv = inject(SsrCookieService);

  isLogin(): boolean {
    return !!this.cookieSrv.get('access_token');
  }

  logout(): void {

  }
}
