import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthApiService } from '@api/auth-api.service';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Component({
  selector: 'email-confirm',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [AuthApiService],
  templateUrl: './email-confirm.component.html',
  styleUrl: './email-confirm.component.sass',
})
export class EmailConfirmComponent {
  private authSrv = inject(AuthApiService);
  private cookieSrv = inject(SsrCookieService);

  confirmForm = new FormGroup({
    name: new FormControl(
      this.cookieSrv.get('userName') ?? '',
      Validators.required,
    ),
    code: new FormControl('', Validators.required),
  });
}
