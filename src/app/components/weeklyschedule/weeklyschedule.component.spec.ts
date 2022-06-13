import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyscheduleComponent } from './weeklyschedule.component';

describe('WeeklyscheduleComponent', () => {
  let component: WeeklyscheduleComponent;
  let fixture: ComponentFixture<WeeklyscheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyscheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
