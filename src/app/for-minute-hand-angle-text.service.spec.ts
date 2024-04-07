import { TestBed } from '@angular/core/testing';

import { ForMinuteHandAngleTextService } from './for-minute-hand-angle-text.service';

describe('ForMinuteHandAngleTextService', () => {
  let service: ForMinuteHandAngleTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForMinuteHandAngleTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
