import { Component } from '@angular/core';
import { GripVerticalIconComponent } from '@icon-components/grip-vertical-icon/grip-vertical-icon.component';
import { MinusIconComponent } from '@icon-components/minus-icon/minus-icon.component';
import { PlusIconComponent } from '@icon-components/plus-icon/plus-icon.component';
import { BroListMock } from '@mock/bro-list.mock';
import { BroListItemDto } from '@dto/bro-list-item.dto';

@Component({
  selector: 'bro-list-create',
  standalone: true,
  imports: [GripVerticalIconComponent, MinusIconComponent, PlusIconComponent],
  templateUrl: './bro-list-create.component.html',
  styleUrl: './bro-list-create.component.sass',
})
export class BroListCreateComponent {
  broList: BroListItemDto[] = BroListMock;
}
