import { TestBed } from '@angular/core/testing';

import { HtmlEditService } from './html-edit.service';

describe('HtmlEditService', () => {
  let service: HtmlEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HtmlEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
