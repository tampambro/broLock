import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProfileApiService } from '@api/profile-api.service';
import { BroLockPreviewComponent } from '@components/bro-lock-preview/bro-lock-preview.component';
import { ProfileResponseDto } from '@dto/profile/profile-response.dto';
import { UserService } from '@services/user.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'profile',
  imports: [BroLockPreviewComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  private profileApiSrv = inject(ProfileApiService);
  private userSrv = inject(UserService);
  private destroyRef = inject(DestroyRef);

  profile = signal<ProfileResponseDto | null>(null);

  ngOnInit(): void {
    combineLatest([
      this.profileApiSrv.getProfile({ userId: this.userSrv.userId }),
    ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ([activeBroLocks]) => {
          this.profile.set(activeBroLocks);
        },
      });
  }
}
