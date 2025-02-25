import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from '@api/auth-api.service';
import { Router } from '@angular/router';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { switchMap } from 'rxjs';

@Component({
  selector: 'singup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [AuthApiService],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.sass',
})
export class SingupComponent {
  private authApiSrv = inject(AuthApiService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private cookieSrv = inject(SsrCookieService);

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
          this.cookieSrv.set('userName', authParams.name, {
            secure: true,
            sameSite: 'Strict',
          });

          this.router.navigate(['/email-confirm']);
        },
      });
  }
}
