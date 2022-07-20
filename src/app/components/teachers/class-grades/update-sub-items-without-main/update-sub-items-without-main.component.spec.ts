import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubItemsWithoutMainComponent } from './update-sub-items-without-main.component';

describe('UpdateSubItemsWithoutMainComponent', () => {
  let component: UpdateSubItemsWithoutMainComponent;
  let fixture: ComponentFixture<UpdateSubItemsWithoutMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSubItemsWithoutMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSubItemsWithoutMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
