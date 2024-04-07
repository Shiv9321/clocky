import { TestBed } from '@angular/core/testing';

import { ForHandsStopTextChangeService } from './for-hands-stop-text-change.service';

describe('ForHandsStopTextChangeService', () => {
  let service: ForHandsStopTextChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForHandsStopTextChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
