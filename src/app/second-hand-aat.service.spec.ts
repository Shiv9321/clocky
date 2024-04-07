import { TestBed } from '@angular/core/testing';

import { SecondHandAatService } from './second-hand-aat.service';

describe('SecondHandAatService', () => {
  let service: SecondHandAatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecondHandAatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
