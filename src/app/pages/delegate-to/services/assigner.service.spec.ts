import { TestBed } from '@angular/core/testing';

import { AssignerService } from './assigner.service';

describe('AssignerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssignerService = TestBed.get(AssignerService);
    expect(service).toBeTruthy();
  });
});
