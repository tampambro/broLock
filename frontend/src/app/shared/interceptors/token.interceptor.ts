import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieSrv = inject(SsrCookieService);

  const token = cookieSrv.get('access_token');

  if (token) {
    const reqWithToken = req.clone({
      headers: req.headers.set('access_token', token),
    });

    return next(reqWithToken);
  }
  return next(req);
};
