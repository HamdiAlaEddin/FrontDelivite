import { TestBed } from '@angular/core/testing';

import { VehiculeserviceService } from './vehiculeservice.service';

describe('VehiculeserviceService', () => {
  let service: VehiculeserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiculeserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
