import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BroLockApiService } from '@api/bro-lock-api.service';
import { BroLockDto } from '@dto/bro-lock/bro-lock.dto';
import { GripVerticalIconComponent } from '@icon-components/grip-vertical-icon/grip-vertical-icon.component';
import { MinusIconComponent } from '@icon-components/minus-icon/minus-icon.component';
import { PlusIconComponent } from '@icon-components/plus-icon/plus-icon.component';

@Component({
  selector: 'bro-lock',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
  imports: [GripVerticalIconComponent, MinusIconComponent, PlusIconComponent, DatePipe],
  templateUrl: './bro-lock.component.html',
  styleUrl: './bro-lock.component.sass',
})
export class BroLockComponent implements OnInit {
  private broLockApiSrv = inject(BroLockApiService);
  private route = inject(ActivatedRoute);

  broLockInfo = signal<BroLockDto | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.broLockApiSrv.getBroLock(+id).subscribe({
        next: response => this.broLockInfo.set(response),
      });
    }
  }
}
