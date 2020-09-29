import { TestBed } from '@angular/core/testing';

import { HanoiService } from './hanoi.service';

describe('HanoiService', () => {
  let service: HanoiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HanoiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
