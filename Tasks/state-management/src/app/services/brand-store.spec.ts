import { TestBed } from '@angular/core/testing';

import { BrandStore } from './brand-store';

describe('BrandStore', () => {
  let service: BrandStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
