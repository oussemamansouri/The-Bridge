import { TestBed } from '@angular/core/testing';

import { AuthformateurService } from './authformateur.service';

describe('AuthformateurService', () => {
  let service: AuthformateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthformateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
