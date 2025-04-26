import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthApiService } from '@api/auth-api.service';
import { ButtonSpinnerComponent } from '@components/button-spinner/button-spinner.component';
import { markAsDirtyAndTouched } from '@helpers/form-helpers';
import { passwordMatchValidator } from '@helpers/password-match-validator';
import { finalize } from 'rxjs';

@Component({
  selector: 'reset-password',
  imports: [ReactiveFormsModule, ButtonSpinnerComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent {
  private fb = inject(FormBuilder);
  private cd = inject(ChangeDetectorRef);
  private authApiSrv = inject(AuthApiService);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  readonly linkToken = this.route.snapshot.paramMap.get('linkToken') as string;

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
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
