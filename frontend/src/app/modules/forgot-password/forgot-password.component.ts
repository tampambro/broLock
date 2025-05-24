import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from '@api/auth-api.service';
import { TOASTER_EVENT_ENUM } from '@bro-src-types/enum';
import { ButtonSpinnerComponent } from '@components/button-spinner/button-spinner.component';
import { ToasterService } from '@components/toaster/toaster.service';
import { markAsDirtyAndTouched } from '@helpers/form-helpers';
import { insertRemoveAnimation } from '@helpers/insert-remove-animation';
import { finalize } from 'rxjs';

@Component({
  selector: 'forgot-password',
  imports: [ReactiveFormsModule, ButtonSpinnerComponent, NgOptimizedImage],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [insertRemoveAnimation],
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private authApiSrv = inject(AuthApiService);
  private cd = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private toasterSrv = inject(ToasterService);

  forgotForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });
  load = false;

  getEmailResetPassword() {
    if (!this.forgotForm.valid) {
      markAsDirtyAndTouched(this.forgotForm);
      return;
    }

    this.load = true;
    this.cd.detectChanges();

    this.authApiSrv
      .sendEmailForgotPassword({
        email: this.forgotForm.controls.email.value,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.load = false;
          this.cd.detectChanges();

          this.toasterSrv.addToast({
            eventType: TOASTER_EVENT_ENUM.SUCCESS,
            text: 'Well done! Check your email, Bro.',
          });
        }),
      )
      .subscribe();
  }
}
