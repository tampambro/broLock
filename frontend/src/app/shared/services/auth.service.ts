import { EventEmitter, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private cookieSrv = inject(SsrCookieService);
  private router = inject(Router);

  logoutEvent = new EventEmitter<void>();

  get isLogin(): boolean {
    return !!this.cookieSrv.get('access_token');
  }

  logout(): void {
    this.cookieSrv.deleteAll();
    this.router.navigate(['/login']);
    this.logoutEvent.emit();
    // TODO Если есть токен авторизации, его надо на беке удолять
  }
}
