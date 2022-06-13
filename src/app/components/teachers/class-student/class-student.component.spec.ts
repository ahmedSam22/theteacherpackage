import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassStudentComponent } from './class-student.component';

describe('ClassStudentComponent', () => {
  let component: ClassStudentComponent;
  let fixture: ComponentFixture<ClassStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
