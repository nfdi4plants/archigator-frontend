import { TestBed } from '@angular/core/testing';

import { ArchigatorResponseService } from './archigator-response.service';

describe('ArchigatorResponseService', () => {
  let service: ArchigatorResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchigatorResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
