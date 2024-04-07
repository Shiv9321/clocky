import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockSecondHandComponent } from './clock-second-hand.component';

describe('ClockSecondHandComponent', () => {
  let component: ClockSecondHandComponent;
  let fixture: ComponentFixture<ClockSecondHandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClockSecondHandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClockSecondHandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
