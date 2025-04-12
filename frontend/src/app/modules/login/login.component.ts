import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { markAsDirtyAndTouched } from '@helpers/form-helpers';
import { insertRemoveAnimation } from '@helpers/insert-remove-animation';
import { ToasterService } from '@components/toaster/toaster.service';
import { TOASTER_EVENT_ENUM } from '@bro-src-types/enum';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
  animations: [insertRemoveAnimation],
})
export class LoginComponent {
  private authSrv = inject(AuthService);
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

    return this.authSrv.login(params).subscribe({
      next: () => this.router.navigate(['/profile']),
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
