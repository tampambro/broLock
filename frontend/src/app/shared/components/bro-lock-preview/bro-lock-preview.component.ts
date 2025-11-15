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

@Component({
  selector: 'bro-lock-preview',
  imports: [NgOptimizedImage, FaIconComponent],
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
