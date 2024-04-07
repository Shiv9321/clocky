import { TestBed } from '@angular/core/testing';

import { MinuteHandAatService } from './minute-hand-aat.service';

describe('MinuteHandAatService', () => {
  let service: MinuteHandAatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinuteHandAatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
