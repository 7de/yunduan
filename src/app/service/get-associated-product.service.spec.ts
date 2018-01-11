import { TestBed, inject } from '@angular/core/testing';

import { GetAssociatedProductService } from './get-associated-product.service';

describe('GetAssociatedProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetAssociatedProductService]
    });
  });

  it('should be created', inject([GetAssociatedProductService], (service: GetAssociatedProductService) => {
    expect(service).toBeTruthy();
  }));
});
