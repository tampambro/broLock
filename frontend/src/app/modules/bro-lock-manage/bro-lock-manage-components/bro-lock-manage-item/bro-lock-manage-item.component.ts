import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GripVerticalIconComponent } from '@icon-components/grip-vertical-icon/grip-vertical-icon.component';
import { ImageIconComponent } from '@icon-components/image-icon/image-icon.component';
import { MinusIconComponent } from '@icon-components/minus-icon/minus-icon.component';

@Component({
  selector: 'bro-lock-manage-item',
  imports: [
    ReactiveFormsModule,
    GripVerticalIconComponent,
    MinusIconComponent,
    ImageIconComponent,
  ],
  templateUrl: './bro-lock-manage-item.component.html',
  styleUrl: './bro-lock-manage-item.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BroLockManageItemComponent {
  formGroup = input.required<FormGroup<any>>();
  formGroupIndex = input.required<number>();
}
