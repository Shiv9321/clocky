import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeButtonBlockComponent } from './time-button-block.component';

describe('TimeButtonBlockComponent', () => {
  let component: TimeButtonBlockComponent;
  let fixture: ComponentFixture<TimeButtonBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeButtonBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeButtonBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
