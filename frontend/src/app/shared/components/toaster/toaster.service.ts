import { EventEmitter, Injectable } from '@angular/core';
import { ToasterMessage } from '@bro-src-types/toaster-message';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private readonly TIMER = 10000;

  private _livingToasts: ToasterMessage[] = [];

  toasterChangeEmitter = new EventEmitter<void>();

  get livingToasts(): ToasterMessage[] {
    return this._livingToasts;
  }

  addToast(toast: ToasterMessage): void {
    this._livingToasts.push(toast);
    this.toasterChangeEmitter.emit();

    timer(this.TIMER).subscribe({
      next: () => this.closeToast(toast),
    });
  }

  closeToast(toast: ToasterMessage): void {
    const dyingToastIndex = this.livingToasts.findIndex(item => item === toast);

    if (dyingToastIndex !== undefined) {
      this._livingToasts.splice(dyingToastIndex, 1);
      this.toasterChangeEmitter.emit();
    }
  }
}
