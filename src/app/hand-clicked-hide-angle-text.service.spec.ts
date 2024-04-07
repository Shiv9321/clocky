import { TestBed } from '@angular/core/testing';

import { HandClickedHideAngleTextService } from './hand-clicked-hide-angle-text.service';

describe('HandClickedHideAngleTextService', () => {
  let service: HandClickedHideAngleTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandClickedHideAngleTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
