import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomePageComponent {
  readonly waifuImgNumber = Math.floor(Math.random() * 13);

  imgLoad = true;
}
