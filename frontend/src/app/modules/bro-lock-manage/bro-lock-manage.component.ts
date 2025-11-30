import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { GripVerticalIconComponent } from '@icon-components/grip-vertical-icon/grip-vertical-icon.component';
import { MinusIconComponent } from '@icon-components/minus-icon/minus-icon.component';
import { PlusIconComponent } from '@icon-components/plus-icon/plus-icon.component';
import { BroListMock } from '@mock/bro-list.mock';
import { BroLockItemDto } from '@dto/bro-lock-items/bro-list-item.dto';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, of, switchMap } from 'rxjs';

type ModeType = 'create' | 'edit';

@Component({
  selector: 'bro-lock-manage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GripVerticalIconComponent, MinusIconComponent, PlusIconComponent],
  templateUrl: './bro-lock-manage.component.html',
  styleUrl: './bro-lock-manage.component.sass',
})
export class BroLockManageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  mode = signal<ModeType | null>(null);
  pageLoad = signal<boolean>(true);
  broLock = signal<BroLockItemDto[]>([]);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.mode.set(params.get('mode') as ModeType);

          if (this.mode() === 'edit') {
            // Тут должен быть запрос на броЛок
            return of({});
          }

          return of(null);
        }),
        finalize(() => this.pageLoad.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: broLock => {
          if (broLock) {
            // this.broLock.set(broLock);
          }
        },
      });
  }
}
