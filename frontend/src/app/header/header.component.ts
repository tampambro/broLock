import { Component, Input, output } from '@angular/core';
import { THEME_ENUM } from '@srcTypes/enum';

@Component({
  selector: 'bro-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
})
export class HeaderComponent {
  toggleTheme = output<void>();

  @Input() currentTheme?: THEME_ENUM;

  emitTheme(): void {
    this.toggleTheme.emit();
  }
}
