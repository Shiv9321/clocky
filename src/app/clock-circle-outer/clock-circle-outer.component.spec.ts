import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockCircleOuterComponent } from './clock-circle-outer.component';

describe('ClockCircleOuterComponent', () => {
  let component: ClockCircleOuterComponent;
  let fixture: ComponentFixture<ClockCircleOuterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClockCircleOuterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClockCircleOuterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
