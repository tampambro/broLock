import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, EMPTY, throwError } from 'rxjs';
import { AuthService } from '@services/auth.service';

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const authSrv = inject(AuthService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        authSrv.logout();

        return EMPTY;
      }
      return throwError(() => err);
    }),
  );
};
