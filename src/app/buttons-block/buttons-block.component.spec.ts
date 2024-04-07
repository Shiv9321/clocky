import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsBlockComponent } from './buttons-block.component';

describe('ButtonsBlockComponent', () => {
  let component: ButtonsBlockComponent;
  let fixture: ComponentFixture<ButtonsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonsBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
