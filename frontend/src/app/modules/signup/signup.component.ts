import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from '@api/auth-api.service';
import { Router } from '@angular/router';
import { markAsDirtyAndTouched } from '@helpers/form-helpers';
import { insertRemoveAnimation } from '@helpers/insert-remove-animation';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'signup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.sass',
  animations: [insertRemoveAnimation],
})
export class SignupComponent {
  private authApiSrv = inject(AuthApiService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  singupForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  createUser(): void {
    if (!this.singupForm.valid) {
      markAsDirtyAndTouched(this.singupForm);
      return;
    }

    const authParams = this.singupForm.getRawValue();

    this.authApiSrv.createUser(authParams).subscribe({
      next: response => {
        this.router.navigate(['/email-confirm', response.linkHash]);
      },
    });
  }
}
