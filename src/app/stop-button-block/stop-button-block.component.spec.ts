import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopButtonBlockComponent } from './stop-button-block.component';

describe('StopButtonBlockComponent', () => {
  let component: StopButtonBlockComponent;
  let fixture: ComponentFixture<StopButtonBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StopButtonBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StopButtonBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
