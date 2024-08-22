import { TestBed } from '@angular/core/testing';

import { PastpaperService } from './pastpaper.service';

describe('PastpaperService', () => {
  let service: PastpaperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PastpaperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
