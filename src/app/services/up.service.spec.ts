import { TestBed, inject } from '@angular/core/testing';

import { UpService } from './up.service';

describe('UpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpService]
    });
  });

  it('should be created', inject([UpService], (service: UpService) => {
    expect(service).toBeTruthy();
  }));
});
