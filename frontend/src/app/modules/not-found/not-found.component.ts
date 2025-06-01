import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'not-found',
  imports: [NgOptimizedImage],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
