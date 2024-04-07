import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockSecondHandAngleTextComponent } from './clock-second-hand-angle-text.component';

describe('ClockSecondHandAngleTextComponent', () => {
  let component: ClockSecondHandAngleTextComponent;
  let fixture: ComponentFixture<ClockSecondHandAngleTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClockSecondHandAngleTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClockSecondHandAngleTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
