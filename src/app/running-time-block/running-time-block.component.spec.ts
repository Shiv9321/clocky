import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningTimeBlockComponent } from './running-time-block.component';

describe('RunningTimeBlockComponent', () => {
  let component: RunningTimeBlockComponent;
  let fixture: ComponentFixture<RunningTimeBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RunningTimeBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RunningTimeBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
