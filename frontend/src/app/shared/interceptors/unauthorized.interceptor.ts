import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { isPlatformBrowser } from '@angular/common';

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const authSrv = inject(AuthService);
  const platformId = inject(PLATFORM_ID);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && isPlatformBrowser(platformId)) {
        return authSrv.refreshToken().pipe(
          switchMap(res => {
            authSrv.cookieSetToken(res.access_token, res.refresh_token);
            const reqWithNewToken = req.clone({
              headers: req.headers.set('access_token', res.access_token),
            });

            return next(reqWithNewToken);
          }),
          catchError(err => {
            authSrv.logout();
            return throwError(() => err);
          }),
        );
      }
      return throwError(() => err);
    }),
  );
};
