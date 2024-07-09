import { TestBed } from '@angular/core/testing';

import { ApiqueueService } from './apiqueue.service';

describe('ApiqueueService', () => {
  let service: ApiqueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiqueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
