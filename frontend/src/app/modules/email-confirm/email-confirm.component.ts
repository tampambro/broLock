import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthApiService } from '@api/auth-api.service';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { markAsDirtyAndTouched } from '@helpers/form-helpers';
import { ToasterService } from '@components/toaster/toaster.service';
import { TOASTER_EVENT_ENUM } from '@bro-src-types/enum';

@Component({
  selector: 'email-confirm',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [AuthApiService],
  templateUrl: './email-confirm.component.html',
  styleUrl: './email-confirm.component.sass',
})
export class EmailConfirmComponent implements OnInit {
  private authSrv = inject(AuthApiService);
  private cookieSrv = inject(SsrCookieService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private toasterSrv = inject(ToasterService);

  private readonly userName: string =
    this.route.snapshot.paramMap.get('userName') ?? '';

  confirmForm = this.fb.nonNullable.group({
    code: ['', Validators.required],
  });

  ngOnInit(): void {
    if (!this.userName) {
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
        userName: this.userName,
        otp: this.confirmForm.controls.code.value,
      })
      .subscribe({
        next: () => this.router.navigate(['/login']),
        error: err => {
          console.error(err);
        },
      });
  }

  sendNewEmail(): void {
    this.toasterSrv.addToast({
      eventType: TOASTER_EVENT_ENUM.SUCCESS,
      text: 'Email have been sent',
    });
  }
}
