import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { ModalTemplateComponent } from '@components/modal-template/modal-template.component';
import { ButtonSpinnerComponent } from '@components/button-spinner/button-spinner.component';
import { UserApiService } from '@api/user-api.service';
import { UserService } from '@services/user.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { markAsDirtyAndTouched } from '@helpers/form-helpers';
import { ToasterService } from '@components/toaster/toaster.service';
import { TOASTER_EVENT_ENUM } from '@bro-src-types/enum';
import { finalize } from 'rxjs';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'bro-phrase-modal',
  imports: [
    ModalTemplateComponent,
    ButtonSpinnerComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './bro-phrase-modal.component.html',
  styleUrl: './bro-phrase-modal.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BroPhraseModalComponent {
  private userSrv = inject(UserService);
  private userApiSrv = inject(UserApiService);
  private fb = inject(FormBuilder);
  private toasterSrv = inject(ToasterService);
  private cd = inject(ChangeDetectorRef);
  private dialogRef = inject(DialogRef);

  form = this.fb.nonNullable.group({
    phrase: ['', [Validators.required, Validators.maxLength(255)]],
  });
  load = false;

  setBroPhrase(): void {
    if (!this.form.valid) {
      markAsDirtyAndTouched(this.form);
      return;
    }

    this.load = true;

    const broPhrase = this.form.controls.phrase.value;

    this.userApiSrv
      .setBroPhrase({
        userId: this.userSrv.userId,
        phrase: broPhrase,
      })
      .pipe(
        finalize(() => {
          this.load = false;
          this.cd.detectChanges();
        }),
      )
      .subscribe({
        next: () => {
          this.toasterSrv.addToast({
            eventType: TOASTER_EVENT_ENUM.SUCCESS,
            text: 'なるほどね。(Keep in the know, bro \u{1F44D})',
          });
          this.dialogRef.close(broPhrase);
        },
      });
  }
}
