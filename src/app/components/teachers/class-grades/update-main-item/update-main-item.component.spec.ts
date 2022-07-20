import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMainItemComponent } from './update-main-item.component';

describe('UpdateMainItemComponent', () => {
  let component: UpdateMainItemComponent;
  let fixture: ComponentFixture<UpdateMainItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMainItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMainItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
