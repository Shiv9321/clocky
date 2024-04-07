import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoToSupportBlockComponent } from './go-to-support-block.component';

describe('GoToSupportBlockComponent', () => {
  let component: GoToSupportBlockComponent;
  let fixture: ComponentFixture<GoToSupportBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoToSupportBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoToSupportBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
