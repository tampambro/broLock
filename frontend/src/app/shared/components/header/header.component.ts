import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { THEME_ENUM } from '@bro-src-types/enum';
import { AuthService } from '@services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '@services/user.service';
import { UserInfoResponseDto } from '@dto/user-info-response.dto';
import { UserApiService } from '@api/user-api.service';
import { of, switchMap } from 'rxjs';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { BroPhraseModalComponent } from './bro-phrase-modal/bro-phrase-modal.component';
import { PlatformService } from '@services/platform.service';
import { ThemeSwitcherComponent } from '@components/theme-switcher/theme-switcher.component';

@Component({
  selector: 'bro-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    NgOptimizedImage,
    ThemeSwitcherComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
})
export class HeaderComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private cd = inject(ChangeDetectorRef);
  private userApiSrv = inject(UserApiService);
  private userSrv = inject(UserService);
  platformSrv = inject(PlatformService);
  authSrv = inject(AuthService);

  private dialog$ = inject(Dialog);

  userInfo: UserInfoResponseDto | null;
  themeMode: THEME_ENUM = THEME_ENUM.DARK;

  currentTheme = input<THEME_ENUM>();

  toggleTheme = output<void>();

  ngOnInit(): void {
    this.authSrv.isLogin
      .pipe(
        switchMap(isLogin => {
          if (isLogin) {
            return this.userApiSrv.getUserInfo({ userId: this.userSrv.userId });
          } else {
            return of(false);
          }
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(userInfo => {
        if (typeof userInfo === 'object') {
          this.userInfo = userInfo;
          this.userSrv.setUserInfo(userInfo);
        } else {
          this.userInfo = null;
        }
        this.cd.detectChanges();
      });
  }

  swicthTheme(): void {
    if (this.themeMode === THEME_ENUM.DARK) {
      this.themeMode = THEME_ENUM.LIGHT;
    } else if (this.themeMode === THEME_ENUM.LIGHT) {
      this.themeMode = THEME_ENUM.DARK;
    }
  }

  aditBroPhrase(): void {
    const dialog = this.dialog$.open(BroPhraseModalComponent);
  }
}
