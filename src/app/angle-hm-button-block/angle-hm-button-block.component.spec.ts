import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngleHmButtonBlockComponent } from './angle-hm-button-block.component';

describe('AngleHmButtonBlockComponent', () => {
  let component: AngleHmButtonBlockComponent;
  let fixture: ComponentFixture<AngleHmButtonBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AngleHmButtonBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AngleHmButtonBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
