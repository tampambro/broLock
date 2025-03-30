import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  input,
  output,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { THEME_ENUM } from '@bro-src-types/enum';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCloudMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'bro-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, FaIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
})
export class HeaderComponent {
  private destroyRef = inject(DestroyRef);
  private cd = inject(ChangeDetectorRef);
  authSrv = inject(AuthService);

  readonly THEME_ENUM = THEME_ENUM;

  faMoon = faCloudMoon;
  faSun = faSun;

  currentTheme = input<THEME_ENUM>();

  toggleTheme = output<void>();

  ngOnInit(): void {
    this.authSrv.logoutEvent
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.cd.detectChanges(),
      });
  }

  emitTheme(): void {
    this.toggleTheme.emit();
  }
}
