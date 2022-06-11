import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifycodeComponent } from './verifycode.component';

describe('VerifycodeComponent', () => {
  let component: VerifycodeComponent;
  let fixture: ComponentFixture<VerifycodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifycodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifycodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
