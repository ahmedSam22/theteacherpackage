import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentBehaviorComponent } from './add-student-behavior.component';

describe('AddBehaviorComponent', () => {
  let component: AddStudentBehaviorComponent;
  let fixture: ComponentFixture<AddStudentBehaviorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentBehaviorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentBehaviorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
