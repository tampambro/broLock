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
import { ProfileApiService } from '@api/profile-api.service';
import { HeaderComponent } from '@components/header/header.component';
import { ToasterComponent } from '@components/toaster/toaster.component';
import { AuthService } from '@services/auth.service';
import { ProfileService } from '@services/profile.service';
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
  private profileApiSrv = inject(ProfileApiService);
  private userSrv = inject(UserService);
  private profileSrv = inject(ProfileService);
  private destroyRef = inject(DestroyRef);
  private cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.authSrv.isLogin
      .pipe(
        switchMap(isLogin => {
          if (isLogin) {
            return this.profileApiSrv.getProfileInfo({
              userId: this.userSrv.userId,
            });
          } else {
            return of(null);
          }
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(profileInfo => {
        this.profileSrv.setProfileInfo(profileInfo);
        this.cd.detectChanges();
      });
  }
}
