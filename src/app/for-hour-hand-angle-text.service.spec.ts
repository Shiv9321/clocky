import { TestBed } from '@angular/core/testing';

import { ForHourHandAngleTextService } from './for-hour-hand-angle-text.service';

describe('ForHourHandAngleTextService', () => {
  let service: ForHourHandAngleTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForHourHandAngleTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
