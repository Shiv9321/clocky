import { TestBed } from '@angular/core/testing';

import { HourHandAatService } from './hour-hand-aat.service';

describe('HourHandAatService', () => {
  let service: HourHandAatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HourHandAatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
