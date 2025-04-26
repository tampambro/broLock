import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');

    if (repeatPassword?.errors && !repeatPassword.errors['passwordMismatch']) {
      return null;
    }

    if (password?.value !== repeatPassword?.value) {
      repeatPassword?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      repeatPassword?.setErrors(null);
      return null;
    }
  };
}
