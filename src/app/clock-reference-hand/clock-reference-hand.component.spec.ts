import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockReferenceHandComponent } from './clock-reference-hand.component';

describe('ClockReferenceHandComponent', () => {
  let component: ClockReferenceHandComponent;
  let fixture: ComponentFixture<ClockReferenceHandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClockReferenceHandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClockReferenceHandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
