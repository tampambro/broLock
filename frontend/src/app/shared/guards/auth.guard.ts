import { isPlatformServer } from '@angular/common';
import {
  inject,
  makeStateKey,
  PLATFORM_ID,
  TransferState,
} from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

const IS_AUTHORIZED_KEY = makeStateKey<boolean>('isAuthorized');

export const authGuard: CanActivateFn = () => {
  const authSrv = inject(AuthService);
  const transferState = inject(TransferState);
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  if (isPlatformServer(platformId)) {
    const isAuthorized = authSrv.isLogin();

    transferState.set(IS_AUTHORIZED_KEY, isAuthorized);

    return isAuthorized;
  }

  const isAuthorized = transferState.get(IS_AUTHORIZED_KEY, false);

  if (!isAuthorized) {
    return router.parseUrl('/login');
  }
  return isAuthorized;
};
