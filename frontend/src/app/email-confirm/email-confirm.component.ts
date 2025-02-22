import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../api/auth.service';

@Component({
  selector: 'email-confirm',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
  templateUrl: './email-confirm.component.html',
  styleUrl: './email-confirm.component.sass',
})
export class EmailConfirmComponent implements AfterViewInit {
  private authSrv = inject(AuthService);

  confirmForm = new FormGroup({
    code: new FormControl('', Validators.required),
  });

  ngAfterViewInit(): void {
    // this.authSrv.createCodeEmailConfirm()
  }
}
