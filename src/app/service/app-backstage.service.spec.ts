import { TestBed, inject } from '@angular/core/testing';

import { AppBackstageService } from './app-backstage.service';

describe('AppBackstageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppBackstageService]
    });
  });

  it('should be created', inject([AppBackstageService], (service: AppBackstageService) => {
    expect(service).toBeTruthy();
  }));
});
