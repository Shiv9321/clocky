import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockOuterDigitsComponent } from './clock-outer-digits.component';

describe('ClockOuterDigitsComponent', () => {
  let component: ClockOuterDigitsComponent;
  let fixture: ComponentFixture<ClockOuterDigitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClockOuterDigitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClockOuterDigitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
