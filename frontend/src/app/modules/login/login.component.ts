import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { markAsDirtyAndTouched } from '@helpers/form-helpers';
import { insertRemoveAnimation } from '@helpers/insert-remove-animation';
import { ToasterService } from '@components/toaster/toaster.service';
import { TOASTER_EVENT_ENUM } from '@bro-src-types/enum';
import { AuthService } from '@services/auth.service';
import { NgOptimizedImage } from '@angular/common';
import { ButtonSpinnerComponent } from '@components/button-spinner/button-spinner.component';

@Component({
  selector: 'login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgOptimizedImage,
    ButtonSpinnerComponent,
  ],
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
  private cd = inject(ChangeDetectorRef);

  loginForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    password: ['', Validators.required],
  });
  load = false;

  login() {
    if (!this.loginForm.valid) {
      markAsDirtyAndTouched(this.loginForm);
      return;
    }

    this.load = true;

    const params = this.loginForm.getRawValue();

    return this.authSrv.login(params).subscribe({
      next: () => this.router.navigate(['/profile']),
      error: (err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.toasterSrv.addToast({
            eventType: TOASTER_EVENT_ENUM.WORNING,
            text: 'It seems your email is not have been confirmed. Check your email please.',
          });
        } else {
          this.toasterSrv.addToast({
            eventType: TOASTER_EVENT_ENUM.DANGER,
            text: 'Wrong name or password',
          });
        }

        this.load = false;
        this.cd.detectChanges();
      },
    });
  }
}
