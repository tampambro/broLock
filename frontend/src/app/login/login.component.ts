import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent {}
