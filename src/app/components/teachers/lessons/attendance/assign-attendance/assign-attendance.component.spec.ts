import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignAttendanceComponent } from './assign-attendance.component';

describe('AssignAttendanceComponent', () => {
  let component: AssignAttendanceComponent;
  let fixture: ComponentFixture<AssignAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
