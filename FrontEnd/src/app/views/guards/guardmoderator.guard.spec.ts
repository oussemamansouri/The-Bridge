import { TestBed } from '@angular/core/testing';

import { GuardmoderatorGuard } from './guardmoderator.guard';

describe('GuardmoderatorGuard', () => {
  let guard: GuardmoderatorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardmoderatorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
