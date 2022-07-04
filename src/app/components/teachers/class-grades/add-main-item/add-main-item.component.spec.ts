import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMainItemComponent } from './add-main-item.component';

describe('AddMainItemComponent', () => {
  let component: AddMainItemComponent;
  let fixture: ComponentFixture<AddMainItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMainItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMainItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
