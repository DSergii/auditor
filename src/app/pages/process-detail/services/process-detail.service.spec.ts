import { TestBed } from '@angular/core/testing';

import { ProcessDetailService } from './process-detail.service';

describe('ProcessDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessDetailService = TestBed.get(ProcessDetailService);
    expect(service).toBeTruthy();
  });
});
