import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-shell',
  imports: [],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {}
