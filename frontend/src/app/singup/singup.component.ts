import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../api/auth.service';

@Component({
  selector: 'singup',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.sass',
})
export class SingupComponent {
  private authSrv = inject(AuthService);

  private fb = inject(FormBuilder);

  singupForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  createUser(): void {
    // if (!this.singupForm.valid) {
    //   return;
    // }

    this.authSrv.createUser(this.singupForm.getRawValue()).subscribe({
      next: res => {
        if (res) {
          console.log(res);
          console.log('ok');
        }
      },
    });
  }
}
