import { TestBed } from '@angular/core/testing';

import { ArchigatorApiService } from './archigator-api.service';

describe('ArchigatorApiService', () => {
  let service: ArchigatorApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchigatorApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
