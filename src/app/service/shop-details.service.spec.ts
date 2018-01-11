import { TestBed, inject } from '@angular/core/testing';

import { ShopDetailsService } from './shop-details.service';

describe('ShopDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopDetailsService]
    });
  });

  it('should be created', inject([ShopDetailsService], (service: ShopDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
