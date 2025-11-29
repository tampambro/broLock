import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GripVerticalIconComponent } from '@icon-components/grip-vertical-icon/grip-vertical-icon.component';
import { MinusIconComponent } from '@icon-components/minus-icon/minus-icon.component';
import { PlusIconComponent } from '@icon-components/plus-icon/plus-icon.component';
import { BroListMock } from '@mock/bro-list.mock';
import { BroLockItemDto } from '@dto/bro-lock-items/bro-list-item.dto';

@Component({
  selector: 'bro-lock-manage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GripVerticalIconComponent, MinusIconComponent, PlusIconComponent],
  templateUrl: './bro-lock-manage.component.html',
  styleUrl: './bro-lock-manage.component.sass',
})
export class BroLockManageComponent {
  broList: BroLockItemDto[] = BroListMock;
}
