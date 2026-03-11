import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { PlusIconComponent } from '@icon-components/plus-icon/plus-icon.component';
import { BroListMock } from '@mock/bro-list.mock';
import { BroLockItemDto } from '@dto/bro-lock/bro-lock-items/bro-list-item.dto';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, of, switchMap } from 'rxjs';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { BroLockManageItemComponent } from './bro-lock-manage-components/bro-lock-manage-item/bro-lock-manage-item.component';
import { isPlatformBrowser } from '@angular/common';
import { SaveIconComponent } from '@icon-components/save-icon/save-icon.component';
import { BroLockApiService } from '@api/bro-lock-api.service';
import { ToasterService } from '@components/toaster/toaster.service';
import { TOASTER_EVENT_ENUM } from '@bro-src-types/enum';

type ModeType = 'create' | 'edit';

interface BroLockItemFormType {
  name: FormControl<string>;
  position: FormControl<number>;
  link: FormControl<string>;
  counter: FormControl<number>;
  authComment: FormControl<string>;
  img: FormControl<string>;
}

@Component({
  selector: 'bro-lock-manage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    PlusIconComponent,
    BroLockManageItemComponent,
    SaveIconComponent,
  ],
  templateUrl: './bro-lock-manage.component.html',
  styleUrl: './bro-lock-manage.component.sass',
})
export class BroLockManageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);
  private platformId = inject(PLATFORM_ID);
  private broLockApiSrv = inject(BroLockApiService);
  private toasterSrv = inject(ToasterService);

  mode = signal<ModeType | null>(null);
  pageLoad = signal(true);
  broLock = signal<BroLockItemDto[]>([]);

  broLockForm = this.fb.nonNullable.group({
    broLockName: ['', Validators.required],
    items: this.fb.array<FormGroup<BroLockItemFormType>>([]),
  });

  get itemControls(): FormArray<FormGroup<BroLockItemFormType>> {
    return this.broLockForm.get('items') as FormArray<FormGroup<BroLockItemFormType>>;
  }

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
            return;
          }

          if (isPlatformBrowser(this.platformId)) {
            this.addBroLockItem();
          }
        },
      });
  }

  addBroLockItem(): void {
    const initPosition = this.broLockForm.controls.items.length;

    this.broLockForm.controls.items.push(
      this.fb.nonNullable.group({
        name: ['', Validators.required],
        position: [initPosition],
        link: [''],
        counter: [0],
        authComment: [''],
        img: [''],
      }),
    );
  }

  saveBroList(): void {
    this.broLockApiSrv
      .createBroLock(this.broLockForm.getRawValue())
      .subscribe({
        next: () => {
          this.toasterSrv.addToast({
            eventType: TOASTER_EVENT_ENUM.SUCCESS,
            text: 'BroLock saved',
          });
        },
        error: () => {
          this.toasterSrv.addToast({
            eventType: TOASTER_EVENT_ENUM.DANGER,
            text: 'Error occurred',
          });
        }
      });
  }

  removeItemHandler(itemFormIndex: number): void {
    this.broLockForm.controls.items.removeAt(itemFormIndex);
  }
}
