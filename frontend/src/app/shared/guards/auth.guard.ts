import { isPlatformServer } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authSrv = inject(AuthService);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformServer(platformId)) {
    // TODO: Возможно, нужно будет переделывать на Angular Universal, так как сейчас
    // если вернуть false, то сервер начинает делать запрос на проверку логина и падает с 401.
    // Сейчас возвращается шаблон страницы, который подразумевает авторизацию.
    // Нужно понять, будет ли там чувствительная информация, если нет, то можно оставить так.
    return true;
  }

  return authSrv.isLogin.pipe(
    map(isLogin => {
      if (!isLogin) {
        authSrv.logout();
        return false;
      } else {
        return true;
      }
    }),
  );
};
