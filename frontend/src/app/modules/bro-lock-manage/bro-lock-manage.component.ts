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
import { BroLockItemDto } from '@dto/bro-lock-items/bro-list-item.dto';
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

type ModeType = 'create' | 'edit';

interface BroLockItemFormType {
  name: FormControl<string>;
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

  broLockForm = this.fb.nonNullable.group({
    broLockName: ['', Validators.required],
    items: this.fb.array<FormGroup<BroLockItemFormType>>([]),
  });

  mode = signal<ModeType | null>(null);
  pageLoad = signal(true);
  broLock = signal<BroLockItemDto[]>([]);

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
    this.broLockForm.controls.items.push(
      this.fb.nonNullable.group({
        name: ['', Validators.required],
        link: [''],
        counter: [0],
        authComment: [''],
        img: [''],
      }),
    );
  }
}
