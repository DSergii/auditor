import { TestBed } from '@angular/core/testing';

import { ResourceCostService } from './resource-cost.service';

describe('ResourceCostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResourceCostService = TestBed.get(ResourceCostService);
    expect(service).toBeTruthy();
  });
});
