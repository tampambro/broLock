import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'find-and-add-icon',
  imports: [FaIconComponent],
  templateUrl: './find-and-add-icon.component.html',
  styleUrl: './find-and-add-icon.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindAndAddIconComponent {
  readonly findAndAddIcon = faMagnifyingGlassPlus;
}
