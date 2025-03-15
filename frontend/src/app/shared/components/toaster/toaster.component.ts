import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { ToasterService } from './toaster.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { insertRemoveAnimation } from '@helpers/insert-remove-animation';
import { CloseIconComponent } from '@icon-components/close-icon/close-icon.component';

@Component({
  selector: 'toaster',
  imports: [CloseIconComponent],
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
