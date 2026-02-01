import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'save-icon',
  imports: [FaIconComponent],
  templateUrl: './save-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveIconComponent {
  saveIcon = faFloppyDisk;
}
