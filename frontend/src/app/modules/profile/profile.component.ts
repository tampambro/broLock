import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthApiService } from '@api/auth-api.service';

@Component({
  selector: 'profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private authSrv = inject(AuthApiService);

  backGuardTest(): void {
    this.authSrv.backGuardTest().subscribe();
  }
}
