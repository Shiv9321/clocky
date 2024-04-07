import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngleHsButtonBlockComponent } from './angle-hs-button-block.component';

describe('AngleHsButtonBlockComponent', () => {
  let component: AngleHsButtonBlockComponent;
  let fixture: ComponentFixture<AngleHsButtonBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AngleHsButtonBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AngleHsButtonBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
