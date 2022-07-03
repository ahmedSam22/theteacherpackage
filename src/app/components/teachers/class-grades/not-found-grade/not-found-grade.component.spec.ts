import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundGradeComponent } from './not-found-grade.component';

describe('NotFoundGradeComponent', () => {
  let component: NotFoundGradeComponent;
  let fixture: ComponentFixture<NotFoundGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFoundGradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
