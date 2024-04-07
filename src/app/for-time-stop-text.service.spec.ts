import { TestBed } from '@angular/core/testing';

import { ForTimeStopTextService } from './for-time-stop-text.service';

describe('ForTimeStopTextService', () => {
  let service: ForTimeStopTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForTimeStopTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
