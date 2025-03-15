import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthApiService } from '@api/auth-api.service';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  providers: [AuthApiService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent {
  private authApiSrv = inject(AuthApiService);
  private cookieSrv = inject(SsrCookieService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  loginForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    password: ['', Validators.required],
  });

  login() {
    const params = this.loginForm.getRawValue();

    return this.authApiSrv.loginUser(params).subscribe({
      next: res => {
        this.cookieSrv.set('userName', params.name, {
          secure: true,
          sameSite: 'Strict',
        });
        this.cookieSrv.set('access_token', res.access_token, {
          secure: true,
          sameSite: 'Strict',
        });
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.router.navigate(['/email-confirm']);
        }
      },
    });
  }
}
