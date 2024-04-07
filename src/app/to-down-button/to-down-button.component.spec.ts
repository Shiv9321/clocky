import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDownButtonComponent } from './to-down-button.component';

describe('ToDownButtonComponent', () => {
  let component: ToDownButtonComponent;
  let fixture: ComponentFixture<ToDownButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToDownButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToDownButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
