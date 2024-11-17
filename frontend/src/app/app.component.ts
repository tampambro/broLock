import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { THEME_ENUM } from '../types/enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  themeMode: THEME_ENUM = THEME_ENUM.DARCK;

  swicthTheme(): void {
    if (this.themeMode === THEME_ENUM.DARCK) {
      this.themeMode = THEME_ENUM.LIGHT;
    } else if (this.themeMode === THEME_ENUM.LIGHT) {
      this.themeMode = THEME_ENUM.DARCK;
    }
  }
}
