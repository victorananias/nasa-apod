import { TestBed } from '@angular/core/testing';

import { PercentageLoaderService } from './percentage-loader.service';

describe('PercentageLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PercentageLoaderService = TestBed.get(PercentageLoaderService);
    expect(service).toBeTruthy();
  });
});
