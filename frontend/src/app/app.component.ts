import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { THEME_ENUM } from '@bro-src-types/enum';
import { HeaderComponent } from '@components/header/header.component';
import { ToasterComponent } from '@components/toaster/toaster.component';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent, ToasterComponent],
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
