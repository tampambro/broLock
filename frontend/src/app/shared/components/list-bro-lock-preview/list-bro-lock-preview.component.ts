import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { BroLockPreviewComponent } from '@components/bro-lock-preview/bro-lock-preview.component';
import { BroLockPreviewItemDto } from '@dto/bro-lock-items/bro-lock-preview-item.dto';
import { PenIconComponent } from '@icon-components/pen-icon/pen-icon.component';

@Component({
  selector: 'list-bro-lock-preview',
  imports: [BroLockPreviewComponent, PenIconComponent],
  templateUrl: './list-bro-lock-preview.component.html',
  styleUrl: './list-bro-lock-preview.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListBroLockPreviewComponent {
  listTitle = input.required<string>();
  list = input<BroLockPreviewItemDto[] | null>();

  editEvent = output<void>();
}
