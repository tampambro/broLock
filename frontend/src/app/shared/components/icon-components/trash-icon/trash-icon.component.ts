import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'trash-icon',
  imports: [FaIconComponent],
  templateUrl: './trash-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrashIconComponent {
  readonly trashIcon = faTrash;
}
