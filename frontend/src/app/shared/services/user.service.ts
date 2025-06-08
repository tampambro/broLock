import { inject, Injectable, OnDestroy } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private cookieSrv = inject(SsrCookieService);

  get userId(): number {
    return +this.cookieSrv.get('userId');
  }
}
