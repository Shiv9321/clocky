import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockMinuteHandComponent } from './clock-minute-hand.component';

describe('ClockMinuteHandComponent', () => {
  let component: ClockMinuteHandComponent;
  let fixture: ComponentFixture<ClockMinuteHandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClockMinuteHandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClockMinuteHandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
