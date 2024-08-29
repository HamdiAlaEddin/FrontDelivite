import { TestBed } from '@angular/core/testing';

import { LivraisonserviceService } from './livraisonservice.service';

describe('LivraisonserviceService', () => {
  let service: LivraisonserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivraisonserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
