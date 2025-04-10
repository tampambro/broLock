import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthApiService } from '@api/auth-api.service';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { markAsDirtyAndTouched } from '@helpers/form-helpers';
import { insertRemoveAnimation } from '@helpers/insert-remove-animation';
import { ToasterService } from '@components/toaster/toaster.service';
import { TOASTER_EVENT_ENUM } from '@bro-src-types/enum';

@Component({
  selector: 'login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
  animations: [insertRemoveAnimation],
})
export class LoginComponent {
  private authApiSrv = inject(AuthApiService);
  private cookieSrv = inject(SsrCookieService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private toasterSrv = inject(ToasterService);

  loginForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    password: ['', Validators.required],
  });

  login() {
    if (!this.loginForm.valid) {
      markAsDirtyAndTouched(this.loginForm);
      return;
    }

    const params = this.loginForm.getRawValue();

    return this.authApiSrv.loginUser(params).subscribe({
      next: res => {
        this.cookieSrv.set('access_token', res.access_token, {
          secure: true,
          sameSite: 'Strict',
        });
        this.cookieSrv.set('refresh_token', res.refresh_token, {
          secure: true,
          sameSite: 'Strict',
        });
        this.cookieSrv.set('userId', res.userId.toString(), {
          secure: true,
          sameSite: 'Strict',
        });

        this.router.navigate(['/profile']);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.router.navigate(['/email-confirm']);
        } else {
          this.toasterSrv.addToast({
            eventType: TOASTER_EVENT_ENUM.DANGER,
            text: 'Wrong name or password',
          });
        }
      },
    });
  }
}
