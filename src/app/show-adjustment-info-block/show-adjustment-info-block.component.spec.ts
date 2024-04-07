import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAdjustmentInfoBlockComponent } from './show-adjustment-info-block.component';

describe('ShowAdjustmentInfoBlockComponent', () => {
  let component: ShowAdjustmentInfoBlockComponent;
  let fixture: ComponentFixture<ShowAdjustmentInfoBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowAdjustmentInfoBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowAdjustmentInfoBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
