import { isPlatformServer } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthApiService } from '@api/auth-api.service';
import { catchError, of, switchMap } from 'rxjs';

export const emailConfirmGuard: CanActivateFn = route => {
  const platformId = inject(PLATFORM_ID);
  const authApiSrv = inject(AuthApiService);
  const router = inject(Router);
  const linkHash = route.paramMap.get('linkHash');

  if (isPlatformServer(platformId)) {
    return false;
  } else {
    if (!linkHash) return false;

    return authApiSrv.checkEmailConfirmItem(linkHash).pipe(
      switchMap(() => of(true)),
      catchError(() => {
        return of(router.parseUrl('/'));
      }),
    );
  }
};
