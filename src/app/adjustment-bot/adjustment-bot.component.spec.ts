import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustmentBotComponent } from './adjustment-bot.component';

describe('AdjustmentBotComponent', () => {
  let component: AdjustmentBotComponent;
  let fixture: ComponentFixture<AdjustmentBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdjustmentBotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdjustmentBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
