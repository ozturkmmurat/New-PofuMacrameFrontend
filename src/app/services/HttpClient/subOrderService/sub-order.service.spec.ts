import { TestBed } from '@angular/core/testing';

import { SubOrderService } from './sub-order.service';

describe('SubOrderService', () => {
  let service: SubOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
