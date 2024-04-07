import { TestBed } from '@angular/core/testing';

import { ForSecondHandAngleTextService } from './for-second-hand-angle-text.service';

describe('ForSecondHandAngleTextService', () => {
  let service: ForSecondHandAngleTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForSecondHandAngleTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
