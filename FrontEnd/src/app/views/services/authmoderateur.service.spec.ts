import { TestBed } from '@angular/core/testing';

import { AuthmoderateurService } from './authmoderateur.service';

describe('AuthmoderateurService', () => {
  let service: AuthmoderateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthmoderateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
