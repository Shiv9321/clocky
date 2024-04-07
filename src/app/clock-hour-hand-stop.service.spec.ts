import { TestBed } from '@angular/core/testing';

import { ClockHourHandStopService } from './clock-hour-hand-stop.service';

describe('ClockHourHandStopService', () => {
  let service: ClockHourHandStopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClockHourHandStopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
