import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockHourHandAngleTextComponent } from './clock-hour-hand-angle-text.component';

describe('ClockHourHandAngleTextComponent', () => {
  let component: ClockHourHandAngleTextComponent;
  let fixture: ComponentFixture<ClockHourHandAngleTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClockHourHandAngleTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClockHourHandAngleTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
