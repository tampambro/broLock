import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  output,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { THEME_ENUM } from '@bro-src-types/enum';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCloudMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'bro-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, FaIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
})
export class HeaderComponent {
  authSrv = inject(AuthService);

  readonly THEME_ENUM = THEME_ENUM;

  faMoon = faCloudMoon;
  faSun = faSun;

  toggleTheme = output<void>();

  @Input() currentTheme?: THEME_ENUM;

  emitTheme(): void {
    this.toggleTheme.emit();
  }
}
