import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProfileApiService } from '@api/profile-api.service';
import { BroLockPreviewItemDto } from '@dto/bro-lock-items/bro-lock-preview-item.dto';
import { UserService } from '@services/user.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'bro-lock-preview',
  imports: [],
  templateUrl: './bro-lock-preview.component.html',
  styleUrl: './bro-lock-preview.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BroLockPreviewComponent {
  lockInfo = input<BroLockPreviewItemDto>();
}
