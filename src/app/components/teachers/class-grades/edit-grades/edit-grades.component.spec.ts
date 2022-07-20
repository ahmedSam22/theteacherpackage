import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGradesComponent } from './edit-grades.component';

describe('EditGradesComponent', () => {
  let component: EditGradesComponent;
  let fixture: ComponentFixture<EditGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGradesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
