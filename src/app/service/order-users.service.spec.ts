import { TestBed, inject } from '@angular/core/testing';

import { OrderUsersService } from './order-users.service';

describe('OrderUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderUsersService]
    });
  });

  it('should be created', inject([OrderUsersService], (service: OrderUsersService) => {
    expect(service).toBeTruthy();
  }));
});
