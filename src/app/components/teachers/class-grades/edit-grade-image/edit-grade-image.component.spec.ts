import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGradeImageComponent } from './edit-grade-image.component';

describe('EditGradeImageComponent', () => {
  let component: EditGradeImageComponent;
  let fixture: ComponentFixture<EditGradeImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGradeImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGradeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
