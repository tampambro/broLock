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
import { ActivatedRoute, Router } from '@angular/router';
import { AuthApiService } from '@api/auth-api.service';
import { TOASTER_EVENT_ENUM } from '@bro-src-types/enum';
import { ButtonSpinnerComponent } from '@components/button-spinner/button-spinner.component';
import { ToasterService } from '@components/toaster/toaster.service';
import { markAsDirtyAndTouched } from '@helpers/form-helpers';
import { insertRemoveAnimation } from '@helpers/insert-remove-animation';
import { passwordMatchValidator } from '@helpers/password-match-validator';
import { finalize } from 'rxjs';

@Component({
  selector: 'reset-password',
  imports: [ReactiveFormsModule, ButtonSpinnerComponent, NgOptimizedImage],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [insertRemoveAnimation],
})
export class ResetPasswordComponent {
  private fb = inject(FormBuilder);
  private cd = inject(ChangeDetectorRef);
  private authApiSrv = inject(AuthApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private toasterSrv = inject(ToasterService);

  readonly linkToken = this.route.snapshot.queryParamMap.get(
    'linkToken',
  ) as string;

  resetPasswordForm = this.fb.nonNullable.group(
    {
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    },
    {
      validators: passwordMatchValidator(),
    },
  );
  load = false;

  resetPassword(): void {
    if (!this.resetPasswordForm.valid) {
      markAsDirtyAndTouched(this.resetPasswordForm);
      return;
    }

    this.load = true;
    this.cd.detectChanges();

    this.authApiSrv
      .resetPassword(this.linkToken, {
        password: this.resetPasswordForm.controls.password.value,
      })
      .pipe(
        finalize(() => {
          this.load = false;
          this.cd.detectChanges();

          this.toasterSrv.addToast({
            eventType: TOASTER_EVENT_ENUM.SUCCESS,
            text: 'Ok, Bro, try login.',
          });
          this.router.navigate(['/login']);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
