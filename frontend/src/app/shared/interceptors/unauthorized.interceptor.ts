import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { catchError, EMPTY, throwError } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { isPlatformBrowser } from '@angular/common';

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const authSrv = inject(AuthService);
  const platformId = inject(PLATFORM_ID);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && isPlatformBrowser(platformId)) {
        authSrv.logout();

        return EMPTY;
      }
      return throwError(() => err);
    }),
  );
};
