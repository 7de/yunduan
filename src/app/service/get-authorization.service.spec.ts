import { TestBed, inject } from '@angular/core/testing';

import { GetAuthorizationService } from './get-authorization.service';

describe('GetAuthorizationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetAuthorizationService]
    });
  });

  it('should be created', inject([GetAuthorizationService], (service: GetAuthorizationService) => {
    expect(service).toBeTruthy();
  }));
});
