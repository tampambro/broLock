import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { THEME_ENUM } from '../types/enum';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  themeMode: THEME_ENUM = THEME_ENUM.DARK;

  swicthTheme(): void {
    if (this.themeMode === THEME_ENUM.DARK) {
      this.themeMode = THEME_ENUM.LIGHT;
    } else if (this.themeMode === THEME_ENUM.LIGHT) {
      this.themeMode = THEME_ENUM.DARK;
    }
  }
}
