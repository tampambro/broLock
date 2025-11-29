import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'book-close-icon',
  imports: [FaIconComponent],
  templateUrl: './book-close-icon.component.html',
  styleUrl: './book-close-icon.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCloseIconComponent {
  readonly bookCloseIcon = faBook;
}
