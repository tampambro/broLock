import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { BroLockPreviewItemDto } from '@dto/bro-lock-items/bro-lock-preview-item.dto';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { BookCloseIconComponent } from '@icon-components/book-close-icon/book-close-icon.component';
import { BookMarkIconComponent } from '@icon-components/book-mark-icon/book-mark-icon.component';
import { BookOpenIconComponent } from '@icon-components/book-open-icon/book-open-icon.component';
import { InfoIconComponent } from '@icon-components/info-icon/info-icon.component';
import { MinusIconComponent } from '@icon-components/minus-icon/minus-icon.component';
import { TrashIconComponent } from '@icon-components/trash-icon/trash-icon.component';

@Component({
  selector: 'bro-lock-preview',
  imports: [
    NgOptimizedImage,
    FaIconComponent,
    InfoIconComponent,
    BookOpenIconComponent,
    BookCloseIconComponent,
    BookMarkIconComponent,
    TrashIconComponent,
    MinusIconComponent,
  ],
  templateUrl: './bro-lock-preview.component.html',
  styleUrl: './bro-lock-preview.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BroLockPreviewComponent {
  readonly anglerRight = faAngleRight;

  isMoreInfo = signal(false);

  lockInfo = input.required<BroLockPreviewItemDto>();

  toggalMoreInfo() {
    this.isMoreInfo.set(!this.isMoreInfo());
  }
}
