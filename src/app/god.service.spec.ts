import { TestBed } from '@angular/core/testing';

import { GodService } from './god.service';

describe('GodService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GodService = TestBed.get(GodService);
    expect(service).toBeTruthy();
  });
});
