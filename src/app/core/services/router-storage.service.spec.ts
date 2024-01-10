import { TestBed } from '@angular/core/testing';

import { RouterStorageService } from './router-storage.service';

describe('RouterStorageService', () => {
  let service: RouterStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
