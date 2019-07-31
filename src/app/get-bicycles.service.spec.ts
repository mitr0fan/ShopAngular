import { TestBed } from '@angular/core/testing';

import { GetBicyclesService } from './get-bicycles.service';

describe('GetBicyclesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetBicyclesService = TestBed.get(GetBicyclesService);
    expect(service).toBeTruthy();
  });
});
