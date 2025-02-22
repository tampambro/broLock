import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'grip-vertical-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './grip-vertical-icon.component.html',
  styleUrl: './grip-vertical-icon.component.sass',
})
export class GripVerticalIconComponent {
  readonly faGripVertical = faGripVertical;
}
