import { TestBed } from '@angular/core/testing';

import { AddToBasketService } from './add-to-basket.service';

describe('AddToBasketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddToBasketService = TestBed.get(AddToBasketService);
    expect(service).toBeTruthy();
  });
});
