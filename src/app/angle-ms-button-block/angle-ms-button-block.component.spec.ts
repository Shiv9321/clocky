import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngleMsButtonBlockComponent } from './angle-ms-button-block.component';

describe('AngleMsButtonBlockComponent', () => {
  let component: AngleMsButtonBlockComponent;
  let fixture: ComponentFixture<AngleMsButtonBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AngleMsButtonBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AngleMsButtonBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
