import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockBlockComponent } from './clock-block.component';

describe('ClockBlockComponent', () => {
  let component: ClockBlockComponent;
  let fixture: ComponentFixture<ClockBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClockBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClockBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
