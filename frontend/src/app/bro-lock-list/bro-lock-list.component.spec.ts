import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackLockListComponent } from './bro-lock-list.component';

describe('BackLockListComponent', () => {
  let component: BackLockListComponent;
  let fixture: ComponentFixture<BackLockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackLockListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BackLockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
