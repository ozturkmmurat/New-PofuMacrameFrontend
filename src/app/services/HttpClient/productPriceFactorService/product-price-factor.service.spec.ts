import { TestBed } from '@angular/core/testing';

import { ProductPriceFactorService } from './product-price-factor.service';

describe('ProductPriceFactorService', () => {
  let service: ProductPriceFactorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductPriceFactorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
