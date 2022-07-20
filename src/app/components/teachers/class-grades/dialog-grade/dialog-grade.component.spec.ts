import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGradeComponent } from './dialog-grade.component';

describe('DialogGradeComponent', () => {
  let component: DialogGradeComponent;
  let fixture: ComponentFixture<DialogGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
