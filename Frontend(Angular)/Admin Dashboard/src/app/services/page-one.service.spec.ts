import { TestBed } from '@angular/core/testing';

import { PageOneService } from './page-one.service';

describe('PageOneService', () => {
  let service: PageOneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageOneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
