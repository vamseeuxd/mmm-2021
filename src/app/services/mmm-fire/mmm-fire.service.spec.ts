import { TestBed } from '@angular/core/testing';

import { MmmFireService } from './mmm-fire.service';

describe('MmmFireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MmmFireService = TestBed.get(MmmFireService);
    expect(service).toBeTruthy();
  });
});
