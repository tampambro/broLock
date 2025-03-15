import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from '@api/auth-api.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'signup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  providers: [AuthApiService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.sass',
})
export class SignupComponent {
  private authApiSrv = inject(AuthApiService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  singupForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  createUser(): void {
    if (!this.singupForm.valid) {
      return;
    }

    const authParams = this.singupForm.getRawValue();

    this.authApiSrv
      .createUser(authParams)
      .pipe(
        switchMap(() => {
          return this.authApiSrv.createCodeEmailConfirm(authParams.name);
        }),
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/email-confirm', authParams.name]);
        },
      });
  }
}
