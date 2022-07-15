import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HAND_SHAPES } from '../shared/enums/hand-shapes.enum';
import { HandShape } from '../shared/interfaces/hand-shape.interface';
import { testUtils } from '../shared/util/test-utils';
import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;
  let httpMock: HttpTestingController;

  let nextSpy: jasmine.Spy;

  const API_URL = 'rock-paper-scissors';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(GameService);

    nextSpy = spyOn(service.evtRestResponse$, 'next')
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve the hand shapes', () => {
    const shapes: HandShape[] = [
      {
        id: HAND_SHAPES.Rock,
        name: 'Rock'
      },
      {
        id: HAND_SHAPES.Paper,
        name: 'Paper'
      },
      {
        id: HAND_SHAPES.Scissors,
        name: 'Scissors'
      }
    ]

    const requestId = service.getHandShapes();
    const expected = { requestId, data: shapes }

    const url = testUtils.buildUrl(API_URL, 'hand-shapes');
    const req = httpMock.expectOne(url);
    req.flush(shapes);

    expect(nextSpy).toHaveBeenCalledWith(expected)
  });

  it('should return the result of the match', () => {
    const mockMatchId = 1;
    const requestId = service.fightRound(mockMatchId, {} as any);
    const mockResponse = { computerShapeId: '1', isUserWin: true }
    const expected = { requestId, data: mockResponse }

    const url = testUtils.buildUrl(API_URL, `${mockMatchId}/fight-round`);
    const req = httpMock.expectOne(url);
    req.flush(mockResponse);

    expect(nextSpy).toHaveBeenCalledWith(expected)
  });
});
