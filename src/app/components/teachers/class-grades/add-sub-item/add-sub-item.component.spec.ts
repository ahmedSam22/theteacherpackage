import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubItemComponent } from './add-sub-item.component';

describe('AddSubItemComponent', () => {
  let component: AddSubItemComponent;
  let fixture: ComponentFixture<AddSubItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
