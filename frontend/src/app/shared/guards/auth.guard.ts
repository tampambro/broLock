import { isPlatformServer } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authSrv = inject(AuthService);
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  const isAuthorized = !!authSrv.isLogin;

  if (isPlatformServer(platformId)) {
    return isAuthorized;
  }

  if (!isAuthorized) {
    return router.parseUrl('/login');
  }
  return isAuthorized;
};
