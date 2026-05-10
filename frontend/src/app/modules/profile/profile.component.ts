import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BroListyApiServicece } from '@api/bro-list-aoi.service';
import { ProfileApiService } from '@api/profile-api.service';
import { PROFILE_BRO_LOCK_LIST_TITLE } from '@bro-src-types/enum';
import { ListBroLockPreviewComponent } from '@components/list-bro-lock-preview/list-bro-lock-preview.component';
import { BroListReqDto } from '@dto/bro-list/bro-list-req.dto';
import { BroListResDto } from '@dto/bro-list/bro-list-res.dto';
import { BRO_LIST_STATE_ENUM } from '@dto/types/bro-state-list.enum';
import { UserService } from '@services/user.service';
import { combineLatest, switchMap } from 'rxjs';

@Component({
  selector: 'profile',
  imports: [ListBroLockPreviewComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  private profileApiSrv = inject(ProfileApiService);
  private broListyApiSrv = inject(BroListyApiServicece);
  private userSrv = inject(UserService);
  private destroyRef = inject(DestroyRef);

  readonly BRO_LOCK_TITLE = PROFILE_BRO_LOCK_LIST_TITLE;

  // profile = signal<ProfileResponseDto | null>(null);
  activeLocks = signal<BroListResDto | null>(null);
  closeLocks = signal<BroListResDto | null>(null);
  createdBroLocks = signal<BroListResDto | null>(null);
  addedBroLocks = signal<BroListResDto | null>(null);
  laterLocks = signal<BroListResDto | null>(null);
  trashLocks = signal<BroListResDto | null>(null);

  ngOnInit(): void {
    this.profileApiSrv.getProfile({ userId: this.userSrv.userId })
      .pipe(
        switchMap(profile => {
          // Если нужно будет сетнуть доп инфу по профилу, делаем это здесь...
          const params: BroListReqDto = {
            profileId: profile.id,
          }

          return combineLatest([
            this.broListyApiSrv.getListsByState({ ...params, state: BRO_LIST_STATE_ENUM.ACTIVE }),
            this.broListyApiSrv.getListsByState({ ...params, state: BRO_LIST_STATE_ENUM.CLOSE }),
            this.broListyApiSrv.getCreatedList(params),
            this.broListyApiSrv.getAddedList(params),
            this.broListyApiSrv.getListsByState({ ...params, state: BRO_LIST_STATE_ENUM.LATE }),
            this.broListyApiSrv.getListsByState({ ...params, state: BRO_LIST_STATE_ENUM.TRASH }),
          ]);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: ([active, close, created, added, late, trash]) => {
          this.activeLocks.set(active);
          this.closeLocks.set(close);
          this.createdBroLocks.set(created);
          this.addedBroLocks.set(added);
          this.laterLocks.set(late);
          this.trashLocks.set(trash);
        },
      });
  }

  goToEdit(listTitle: PROFILE_BRO_LOCK_LIST_TITLE): void {

  }
}
