import { TestBed } from '@angular/core/testing';

import { CommpentService } from './commpent.service';

describe('CommpentService', () => {
  let service: CommpentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommpentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
