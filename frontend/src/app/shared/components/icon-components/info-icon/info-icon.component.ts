import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'info-icon',
  imports: [FaIconComponent],
  templateUrl: './info-icon.component.html',
  styleUrl: './info-icon.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoIconComponent {
  readonly infoIcon = faInfo;
}
