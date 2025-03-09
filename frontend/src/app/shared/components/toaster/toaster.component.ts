import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { ToasterService } from './toaster.service';
import { JsonPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { insertRemoveAnimation } from '@helpers/insert-remove-animation';

@Component({
  selector: 'toaster',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [insertRemoveAnimation],
})
export class ToasterComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private cd = inject(ChangeDetectorRef);

  toasterSrv = inject(ToasterService);

  ngOnInit(): void {
    this.toasterSrv.toasterChangeEmitter
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.cd.detectChanges(),
      });
  }
}
