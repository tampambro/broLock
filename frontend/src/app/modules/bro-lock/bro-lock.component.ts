import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GripVerticalIconComponent } from '@icon-components/grip-vertical-icon/grip-vertical-icon.component';
import { MinusIconComponent } from '@icon-components/minus-icon/minus-icon.component';
import { PlusIconComponent } from '@icon-components/plus-icon/plus-icon.component';
import { BroListMock } from '@mock/bro-list.mock';

@Component({
  selector: 'bro-lock',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GripVerticalIconComponent, MinusIconComponent, PlusIconComponent],
  templateUrl: './bro-lock.component.html',
  styleUrl: './bro-lock.component.sass',
})
export class BroLockComponent {
}
