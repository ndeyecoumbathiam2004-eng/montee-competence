import { TestBed } from '@angular/core/testing';
import { Adherent } from './adherent';

describe('Adherent', () => {
  let service: Adherent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Adherent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
