import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'plus-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FaIconComponent],
  templateUrl: './plus-icon.component.html',
  styleUrl: './plus-icon.component.sass',
})
export class PlusIconComponent {
  readonly faPlus = faPlus;
}
