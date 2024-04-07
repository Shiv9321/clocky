import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockInnerCircleComponent } from './clock-inner-circle.component';

describe('ClockInnerCircleComponent', () => {
  let component: ClockInnerCircleComponent;
  let fixture: ComponentFixture<ClockInnerCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClockInnerCircleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClockInnerCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
