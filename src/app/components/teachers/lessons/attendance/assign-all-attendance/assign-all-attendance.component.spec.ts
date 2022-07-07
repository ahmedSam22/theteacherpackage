import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignAllAttendanceComponent } from './assign-all-attendance.component';

describe('AssignAllAttendanceComponent', () => {
  let component: AssignAllAttendanceComponent;
  let fixture: ComponentFixture<AssignAllAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignAllAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignAllAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
