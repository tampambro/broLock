import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
export class EmailConfirmComponent implements OnInit {
  private authSrv = inject(AuthApiService);
  private cookieSrv = inject(SsrCookieService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private readonly userName = this.route.snapshot.paramMap.get('userName');

  confirmForm = new FormGroup({
    code: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    if (!this.userName) {
      this.router.navigate(['/']);
    } else {

    }
  }
}
