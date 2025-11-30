import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'file-pen-icon',
  imports: [FaIconComponent],
  templateUrl: './file-pen-icon.component.html',
  styleUrl: './file-pen-icon.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilePenIconComponent {
  readonly filePenIcon = faFilePen;
}
