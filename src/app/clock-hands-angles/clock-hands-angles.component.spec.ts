import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockHandsAnglesComponent } from './clock-hands-angles.component';

describe('ClockHandsAnglesComponent', () => {
  let component: ClockHandsAnglesComponent;
  let fixture: ComponentFixture<ClockHandsAnglesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClockHandsAnglesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClockHandsAnglesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
