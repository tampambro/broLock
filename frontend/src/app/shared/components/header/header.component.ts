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
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCloudMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '@services/user.service';
import { UserInfoResponseDto } from '@dto/user-info-response.dto';
import { UserApiService } from '@api/user-api.service';
import { of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'bro-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, FaIconComponent, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
})
export class HeaderComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private cd = inject(ChangeDetectorRef);
  private userApiSrv = inject(UserApiService);
  private userSrv = inject(UserService);
  authSrv = inject(AuthService);

  readonly THEME_ENUM = THEME_ENUM;

  faMoon = faCloudMoon;
  faSun = faSun;
  userInfo: UserInfoResponseDto | null;

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

  emitTheme(): void {
    this.toggleTheme.emit();
  }
}
