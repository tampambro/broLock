import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'button-spinner',
  imports: [FaIconComponent],
  templateUrl: './button-spinner.component.html',
  styleUrl: './button-spinner.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonSpinnerComponent {
  readonly faGear = faGear;

  text = input<string>();
  isLoad = input<boolean>(false);
  typeBtn = input<string>('button');
}
