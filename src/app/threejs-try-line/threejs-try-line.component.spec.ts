import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreejsTryLineComponent } from './threejs-try-line.component';

describe('ThreejsTryLineComponent', () => {
  let component: ThreejsTryLineComponent;
  let fixture: ComponentFixture<ThreejsTryLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThreejsTryLineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThreejsTryLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
