import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'book-open-icon',
  imports: [FaIconComponent],
  templateUrl: './book-open-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookOpenIconComponent {
  readonly bookOpenIcon = faBookOpen;
}
