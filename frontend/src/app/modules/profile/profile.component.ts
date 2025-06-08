import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProfileApiService } from '@api/profile-api.service';
import { BroLockPreviewComponent } from '@components/bro-lock-preview/bro-lock-preview.component';
import { BroLockPreviewItem } from '@dto/bro-lock-items/bro-lock-preview-item.dto';
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
  private cd = inject(ChangeDetectorRef);

  activeBroLocks: BroLockPreviewItem[];

  ngOnInit(): void {
    combineLatest([
      this.profileApiSrv.getActiveBroLocks({ userId: this.userSrv.userId }),
    ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ([activeBroLocks]) => {
          this.activeBroLocks = activeBroLocks.data;

          this.cd.detectChanges();
        },
      });
  }
}
