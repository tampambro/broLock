import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'modal-template',
  imports: [FaIconComponent],
  templateUrl: './modal-template.component.html',
  styleUrl: './modal-template.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalTemplateComponent {
  private dialogRef = inject(DialogRef);

  readonly faClose = faClose;

  closeModal(): void {
    this.dialogRef.close();
  }
}
