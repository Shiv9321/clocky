import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockHourHandComponent } from './clock-hour-hand.component';

describe('ClockHourHandComponent', () => {
  let component: ClockHourHandComponent;
  let fixture: ComponentFixture<ClockHourHandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClockHourHandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClockHourHandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
