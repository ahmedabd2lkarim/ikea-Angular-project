import { TestBed } from '@angular/core/testing';

import { VendorProfileService } from './vendor-profile.service';

describe('VendorProfileService', () => {
  let service: VendorProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
