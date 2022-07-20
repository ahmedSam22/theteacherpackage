import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSubItemsComponent } from './dialog-sub-items.component';

describe('DialogSubItemsComponent', () => {
  let component: DialogSubItemsComponent;
  let fixture: ComponentFixture<DialogSubItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSubItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSubItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
