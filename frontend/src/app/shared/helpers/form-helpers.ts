import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

export const markAsDirtyAndTouched = (
  form: FormGroup | FormControl | AbstractControl,
): void => {
  form.markAsDirty();
  form.markAsTouched();
  if (form instanceof FormGroup) {
    if (!form.controls) {
      return;
    }
    for (const key in form.controls) {
      markAsDirtyAndTouched(form.get(key) as AbstractControl);
    }
  }
};
