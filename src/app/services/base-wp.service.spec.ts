import { TestBed } from '@angular/core/testing';

import { BaseWPService } from './base-wp.service';

describe('BaseWPService', () => {
  let service: BaseWPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseWPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
