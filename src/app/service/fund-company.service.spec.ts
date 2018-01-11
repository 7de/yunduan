import { TestBed, inject } from '@angular/core/testing';

import { FundCompanyService } from './fund-company.service';

describe('FundCompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FundCompanyService]
    });
  });

  it('should be created', inject([FundCompanyService], (service: FundCompanyService) => {
    expect(service).toBeTruthy();
  }));
});
