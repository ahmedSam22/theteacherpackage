import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGradeComponent } from './delete-grade.component';

describe('DeleteGradeComponent', () => {
  let component: DeleteGradeComponent;
  let fixture: ComponentFixture<DeleteGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteGradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
