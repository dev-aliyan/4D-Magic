import { TestBed } from '@angular/core/testing';

import { BrandStoreService } from './brand-store.service';

describe('BrandStoreService', () => {
  let service: BrandStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
