import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthApiService } from '@api/auth-api.service';
import { markAsDirtyAndTouched } from '@helpers/form-helpers';
import { ToasterService } from '@components/toaster/toaster.service';
import { TOASTER_EVENT_ENUM } from '@bro-src-types/enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'email-confirm',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './email-confirm.component.html',
  styleUrl: './email-confirm.component.sass',
})
export class EmailConfirmComponent implements OnInit {
  private authSrv = inject(AuthApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private toasterSrv = inject(ToasterService);
  private destroyRef = inject(DestroyRef);

  private readonly linkHash: string =
    this.route.snapshot.paramMap.get('linkHash') ?? '';

  confirmForm = this.fb.nonNullable.group({
    code: ['', Validators.required],
  });

  ngOnInit(): void {
    if (!this.linkHash) {
      this.router.navigate(['/']);
    }
  }

  validateEmail(): void {
    if (!this.confirmForm.valid) {
      markAsDirtyAndTouched(this.confirmForm);
      return;
    }

    this.authSrv
      .validateEmail({
        linkHash: this.linkHash,
        otp: this.confirmForm.controls.code.value,
      })
      .subscribe({
        next: () => {
          this.toasterSrv.addToast({
            eventType: TOASTER_EVENT_ENUM.SUCCESS,
            text: 'Well done, bro! Now just login and chill =)',
          });
          this.router.navigate(['/login']);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 400) {
            this.toasterSrv.addToast({
              eventType: TOASTER_EVENT_ENUM.DANGER,
              text: 'Something wrong, bro. Check code or try send new email.',
            });
          }
        },
      });
  }

  sendNewEmail(): void {
    this.authSrv
      .createCodeEmailConfirm(this.linkHash)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toasterSrv.addToast({
            eventType: TOASTER_EVENT_ENUM.SUCCESS,
            text: 'Email have been sent',
          });
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error);

          if (err.error.message === 'It is not time yet') {
            this.toasterSrv.addToast({
              eventType: TOASTER_EVENT_ENUM.DANGER,
              text: "You can make a try every 5 minutes. But it's not time yet, bro.",
            });
          }
        },
      });
  }
}
