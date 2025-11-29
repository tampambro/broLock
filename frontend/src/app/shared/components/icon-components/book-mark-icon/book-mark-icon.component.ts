import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faBookBookmark } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'book-mark-icon',
  imports: [FaIconComponent],
  templateUrl: './book-mark-icon.component.html',
  styleUrl: './book-mark-icon.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookMarkIconComponent {
  readonly bookMarkIcon = faBookBookmark;
}
