import { isPlatformServer } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authSrv = inject(AuthService);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformServer(platformId)) {
    return false;
  }

  return authSrv.isLogin.pipe(
    map(isLogin => {
      if (!isLogin) {
        debugger
        authSrv.logout();
        return false;
      } else {
        return true;
      }
    }),
  );
};
