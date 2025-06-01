import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { THEME_ENUM } from '@bro-src-types/enum';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCloudMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { PlatformService } from '@services/platform.service';

@Component({
  selector: 'theme-switcher',
  imports: [FaIconComponent],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent {
  private document = inject(DOCUMENT);
  private platformSrv = inject(PlatformService);

  readonly THEMES = THEME_ENUM;
  readonly faMoon = faCloudMoon;
  readonly faSun = faSun;

  activeTheme: THEME_ENUM;

  ngOnInit(): void {
    if (this.platformSrv.isBrowser()) {
      const theme = localStorage.getItem('theme');

      if (!this.isValidTheme(theme)) {
        this.activeTheme = this.document.defaultView?.matchMedia(
          '(prefers-color-scheme: dark)',
        ).matches
          ? THEME_ENUM.DARK
          : THEME_ENUM.LIGHT;
      }
      this.setThemeAttribute();
    }
  }

  private isValidTheme(value: string | null): value is THEME_ENUM {
    return (
      value !== null && Object.values(THEME_ENUM).includes(value as THEME_ENUM)
    );
  }

  private setThemeAttribute(): void {
    const body = this.document.defaultView?.document.body;

    body?.setAttribute('data-theme', this.activeTheme);
  }

  themeHandler(): void {
    if (this.activeTheme === THEME_ENUM.DARK) {
      this.activeTheme = THEME_ENUM.LIGHT;
    } else {
      this.activeTheme = THEME_ENUM.DARK;
    }

    this.setThemeAttribute();
  }
}
