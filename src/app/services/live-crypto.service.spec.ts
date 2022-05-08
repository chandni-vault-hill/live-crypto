import { TestBed } from '@angular/core/testing';

import { LiveCryptoService } from './live-crypto.service';

describe('LiveCryptoService', () => {
  let service: LiveCryptoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveCryptoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
