import { isPlatformServer } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';

export const resetPasswordGuard: CanActivateFn = route => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);
  const linkToken = route.queryParamMap.get('linkToken');

  if (isPlatformServer(platformId)) {
    return false;
  } else {
    if (!linkToken) {
      return of(router.parseUrl('/'));
    } else {
      return true;
    }
  }
};
