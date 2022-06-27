import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBehaviorComponent } from './add-behavior.component';

describe('AddBehaviorComponent', () => {
  let component: AddBehaviorComponent;
  let fixture: ComponentFixture<AddBehaviorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBehaviorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBehaviorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
