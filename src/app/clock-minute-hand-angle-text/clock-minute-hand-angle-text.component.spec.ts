import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockMinuteHandAngleTextComponent } from './clock-minute-hand-angle-text.component';

describe('ClockMinuteHandAngleTextComponent', () => {
  let component: ClockMinuteHandAngleTextComponent;
  let fixture: ComponentFixture<ClockMinuteHandAngleTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClockMinuteHandAngleTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClockMinuteHandAngleTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
