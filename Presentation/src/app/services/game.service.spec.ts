import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HAND_SHAPES } from '../shared/enums/hand-shapes.enum';
import { HandShape } from '../shared/interfaces/hand-shape.interface';
import { GameService } from './game.service';

describe('RockPaperScissorsService', () => {
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

    const req = httpMock.expectOne(`${API_URL}/hand-shapes`);
    req.flush(shapes);

    expect(nextSpy).toHaveBeenCalledWith(expected)
  });

  it('should return the result of the match', () => {
    const requestId = service.fightRound({} as any);
    const mockResponse = { computerShapeId: '1', isUserWin: true }
    const expected = { requestId, data: mockResponse }

    const req = httpMock.expectOne(`${API_URL}/fight-round`);
    req.flush(mockResponse);

    expect(nextSpy).toHaveBeenCalledWith(expected)
  });
});