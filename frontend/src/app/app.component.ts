import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { UserApiService } from '@api/user-api.service';
import { HeaderComponent } from '@components/header/header.component';
import { ToasterComponent } from '@components/toaster/toaster.component';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent, ToasterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent implements OnInit {
  private authSrv = inject(AuthService);
  private userApiSrv = inject(UserApiService);
  private userSrv = inject(UserService);
  private destroyRef = inject(DestroyRef);
  private cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.authSrv.isLogin
      .pipe(
        switchMap(isLogin => {
          if (isLogin) {
            return this.userApiSrv.getUserInfo({ userId: this.userSrv.userId });
          } else {
            return of(null);
          }
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(userInfo => {
        this.userSrv.setUserInfo(userInfo);
        this.cd.detectChanges();
      });
  }
}
