import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorSettingComponent } from './behavior-setting.component';

describe('BehaviorSettingComponent', () => {
  let component: BehaviorSettingComponent;
  let fixture: ComponentFixture<BehaviorSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BehaviorSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BehaviorSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
