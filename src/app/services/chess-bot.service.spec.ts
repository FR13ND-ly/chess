import { TestBed } from '@angular/core/testing';

import { ChessBotService } from './chess-bot.service';

describe('ChessBotService', () => {
  let service: ChessBotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChessBotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
