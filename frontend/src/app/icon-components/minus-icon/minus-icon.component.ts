import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'minus-icon',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './minus-icon.component.html',
  styleUrl: './minus-icon.component.sass',
})
export class MinusIconComponent {
  readonly faMinus = faMinus;
}
