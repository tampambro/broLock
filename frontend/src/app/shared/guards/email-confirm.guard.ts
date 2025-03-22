import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthApiService } from '@api/auth-api.service';
import { catchError, of, switchMap } from 'rxjs';

export const emailConfirmGuard: CanActivateFn = route => {
  const authApiSrv = inject(AuthApiService);
  const router = inject(Router);

  const linkHash = route.paramMap.get('linkHash');
  if (linkHash) {
    return authApiSrv.checkEmailConfirmItem(linkHash).pipe(
      switchMap(() => of(true)),
      catchError(() => {
        router.navigate(['/']);
        return of(false);
      }),
    );
  } else {
    router.navigate(['/']);
    return false;
  }
};
