import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeButtonBComponent } from './time-button-b.component';

describe('TimeButtonBComponent', () => {
  let component: TimeButtonBComponent;
  let fixture: ComponentFixture<TimeButtonBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeButtonBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeButtonBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
