import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'close-icon',
  imports: [FaIconComponent],
  templateUrl: './close-icon.component.html',
  styleUrl: './close-icon.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseIconComponent {
  readonly faXmark = faXmark;

  closeEvent = output<void>();
}
