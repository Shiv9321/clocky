import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockInnerDigitsComponent } from './clock-inner-digits.component';

describe('ClockInnerDigitsComponent', () => {
  let component: ClockInnerDigitsComponent;
  let fixture: ComponentFixture<ClockInnerDigitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClockInnerDigitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClockInnerDigitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
