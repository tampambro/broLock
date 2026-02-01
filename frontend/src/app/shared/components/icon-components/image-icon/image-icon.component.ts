import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'image-icon',
  imports: [FaIconComponent],
  templateUrl: './image-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageIconComponent {
  readonly faImage = faImage;
}
