import { TestBed, inject } from '@angular/core/testing';

import { ShopShowService } from './shop-show.service';

describe('ShopShowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopShowService]
    });
  });

  it('should be created', inject([ShopShowService], (service: ShopShowService) => {
    expect(service).toBeTruthy();
  }));
});
