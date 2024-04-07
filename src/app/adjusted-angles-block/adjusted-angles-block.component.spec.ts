import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustedAnglesBlockComponent } from './adjusted-angles-block.component';

describe('AdjustedAnglesBlockComponent', () => {
  let component: AdjustedAnglesBlockComponent;
  let fixture: ComponentFixture<AdjustedAnglesBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdjustedAnglesBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdjustedAnglesBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
