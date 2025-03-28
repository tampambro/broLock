import { animate, style, transition, trigger } from '@angular/animations';

export const insertRemoveAnimation = trigger('inserRemove', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('150ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [animate('150ms', style({ opacity: 0 }))]),
]);
