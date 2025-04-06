import { isPlatformServer } from '@angular/common';
import {
  inject,
  makeStateKey,
  PLATFORM_ID,
  TransferState,
} from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthApiService } from '@api/auth-api.service';
import { catchError, map, of } from 'rxjs';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

const IS_NEED_LOGOUT = makeStateKey<boolean>('isNeedLogout');

export const authGuard: CanActivateFn = () => {
  const authSrv = inject(AuthService);
  const authApiSrv = inject(AuthApiService);
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);
  const cookieSrv = inject(SsrCookieService);
  const transferState = inject(TransferState);

  if (isPlatformServer(platformId)) {
    if (cookieSrv.get('access_token')) {
      return authApiSrv.checkAuth().pipe(
        map(response => {
          if (response === 'ok') {
            transferState.set(IS_NEED_LOGOUT, false);
            return true;
          } else {
            transferState.set(IS_NEED_LOGOUT, true);
            return false;
          }
        }),
        catchError(() => {
          transferState.set(IS_NEED_LOGOUT, true);
          return of(false);
        }),
      );
    } else {
      transferState.set(IS_NEED_LOGOUT, false);
      return false;
    }
  }

  const isAuthorized = authSrv.isLogin;

  if (isAuthorized && transferState.get(IS_NEED_LOGOUT, false)) {
    authSrv.logout();
    return false;
  }

  if (!isAuthorized) {
    return router.parseUrl('/login');
  }
  return isAuthorized;
};
