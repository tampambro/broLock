import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalTemplateComponent } from '@components/modal-template/modal-template.component';
import { ButtonSpinnerComponent } from '@components/button-spinner/button-spinner.component';

@Component({
  selector: 'bro-phrase-modal',
  imports: [ModalTemplateComponent, ButtonSpinnerComponent],
  templateUrl: './bro-phrase-modal.component.html',
  styleUrl: './bro-phrase-modal.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BroPhraseModalComponent {
  load = false;
}
