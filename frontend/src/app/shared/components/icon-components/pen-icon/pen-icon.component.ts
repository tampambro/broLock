import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pen-icon',
  imports: [FaIconComponent],
  templateUrl: './pen-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PenIconComponent {
  readonly faPen = faPenToSquare;
}
