import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GameService } from '../../../services/game.service';
import { ServiceActions } from '../../../services/service-actions';
import { HAND_SHAPES } from '../../../shared/enums/hand-shapes.enum';
import { HandShape } from '../../../shared/interfaces/hand-shape.interface';
import { RoundOutcome } from '../../../shared/interfaces/round-outcome.interface';

import { FormsModule } from '@angular/forms';
import { DD_OUTCOME } from '../../../shared/enums/dd-outcome.enum';
import { GameComponent } from './game.component';
import { HandShapeComponent } from './hand-shape/hand-shape.component';
import { OutcomeComponent } from './outcome/outcome.component';
import { RoundOutcomeHandShapesComponent } from './round-outcome-hand-shapes/round-outcome-hand-shapes.component';
import { UserHandShapeInputComponent } from './user-hand-shape-input/user-hand-shape-input.component';
import { UserRoundsPerMatchInputComponent } from './user-rounds-per-match-input/user-rounds-per-match-input.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  let gameServiceSpy: jasmine.SpyObj<GameService>;
  const getHandShapesMockId = 'get hand shapes mock id';
  const createMatchMockId = 'create match mock id';
  const fightRoundMockId = 'fight round mock id';

  const mockMatchId = 1;
  const mockShapes: HandShape[] = [
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
  ];

  beforeEach(async () => {
    // gameServiceSpy = jasmine.createSpyObj(
    //   'Game Service',
    //   ['getHandShapes', 'createMatch', 'fightRound'],
    //   {
    //     'evtRestResponse$': new Subject(),
    //     // 'selectors': {
    //     //   selectHandShapes: new Subject(),
    //     //   selectMatchId: new Subject(),
    //     //   selectRoundOutcome: new Subject(),
    //     //   selectUserHandShape: new Subject(),
    //     //   selectCpuHandShape: new Subject(),
    //     // }
    //   }
    // );
    // gameServiceSpy.getHandShapes.and.returnValue(getHandShapesMockId)
    // gameServiceSpy.createMatch.and.returnValue(createMatchMockId)
    // gameServiceSpy.fightRound.and.returnValue(fightRoundMockId)

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [
        GameComponent,
        HandShapeComponent,
        UserHandShapeInputComponent,
        UserRoundsPerMatchInputComponent,
        RoundOutcomeHandShapesComponent,
        OutcomeComponent
      ],
      // providers: [
      //   {
      //     provide: GameService,
      //     useValue: gameServiceSpy
      //   }
      // ]
      providers: [
        GameService
      ]
    })
      .compileComponents();

    const gameService = TestBed.inject(GameService);
    gameServiceSpy = spyOnAllFunctions(gameService, true);
    gameServiceSpy.getHandShapes.and.returnValue(getHandShapesMockId)
    gameServiceSpy.createMatch.and.returnValue(createMatchMockId)
    gameServiceSpy.fightRound.and.returnValue(fightRoundMockId)

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    gameServiceSpy.evtRestResponse$.next({ requestId: createMatchMockId, action: ServiceActions.Game.CREATE_MATCH, data: mockMatchId });
    gameServiceSpy.evtRestResponse$.next({ requestId: getHandShapesMockId, action: ServiceActions.Game.GET_HAND_SHAPES, data: mockShapes });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Methods', () => {
    describe('Match creation', () => {
      it('should retrieve the match id', () => {
        expect(gameServiceSpy.createMatch).toHaveBeenCalled();
      })

      // TODO: Fix test
      xit('should assign the data to the match id property', (fnDone) => {
        component.matchId$.subscribe(result => {
          expect(result).toEqual(mockMatchId);
          fnDone();
        });
      })
    })

    describe('Hand shape retrieval', () => {
      it('should retrieve the data', () => {
        expect(gameServiceSpy.getHandShapes).toHaveBeenCalled();
      })
      it('should assign the data to the handShapes property', (fnDone) => {
        // Assert
        component.handShapes$.subscribe(result => {
          expect(result).toEqual(mockShapes);
          fnDone();
        });

        // Act
      })
    })

    describe('Fight round', () => {
      it('should send the selected shape to fight the round', () => {
        const matchId = 1;
        const selectedShape = { id: HAND_SHAPES.Rock, name: 'Rock' };
        component.fightRound(matchId, selectedShape);
        expect(gameServiceSpy.fightRound).toHaveBeenCalledWith(matchId, selectedShape.id);
      })

      describe('Display result', () => {
        beforeEach(() => {
          gameServiceSpy.evtRestResponse$.next({ requestId: getHandShapesMockId, action: ServiceActions.Game.GET_HAND_SHAPES, data: mockShapes });
        });

        const getResultContent = () => {
          const container = fixture.debugElement.query(By.css('#round-outcome .outcome'))
          return (container.nativeElement as HTMLElement).textContent?.toLowerCase();
        };
        it('should display the tie', () => {
          const mockResult: RoundOutcome = { userShapeId: HAND_SHAPES.Rock, cpuShapeId: HAND_SHAPES.Rock, isTie: true, isUserVictory: false, resultDto: { id: DD_OUTCOME.Tie } }
          const matchId = 1;

          component.fightRound(matchId, { id: HAND_SHAPES.Rock, name: 'Rock' });
          gameServiceSpy.evtRestResponse$.next({ requestId: fightRoundMockId, action: ServiceActions.Game.FIGHT_ROUND, data: mockResult });
          fixture.detectChanges();

          const result = getResultContent();
          expect(result).toContain('tie')
        })
        it('should display the victory', () => {
          const mockResult: RoundOutcome = { userShapeId: HAND_SHAPES.Paper, cpuShapeId: HAND_SHAPES.Rock, isTie: false, isUserVictory: true, resultDto: { id: DD_OUTCOME.Victory } }
          const matchId = 1;

          component.fightRound(matchId, { id: HAND_SHAPES.Paper, name: 'Paper' });
          gameServiceSpy.evtRestResponse$.next({ requestId: fightRoundMockId, action: ServiceActions.Game.FIGHT_ROUND, data: mockResult });
          fixture.detectChanges();

          const result = getResultContent();
          expect(result).toContain('victory')
        })
        it('should display the loss', () => {
          const mockResult: RoundOutcome = { userShapeId: HAND_SHAPES.Scissors, cpuShapeId: HAND_SHAPES.Rock, isTie: false, isUserVictory: false, resultDto: { id: DD_OUTCOME.Loss } }
          const matchId = 1;

          component.fightRound(matchId, { id: HAND_SHAPES.Scissors, name: 'Rock' });
          gameServiceSpy.evtRestResponse$.next({ requestId: fightRoundMockId, action: ServiceActions.Game.FIGHT_ROUND, data: mockResult });
          fixture.detectChanges();

          const result = getResultContent();
          expect(result).toContain('loss')
        })

        it('should display the user shape', () => {
          const mockResult: RoundOutcome = { userShapeId: HAND_SHAPES.Rock, cpuShapeId: HAND_SHAPES.Paper, isTie: true, isUserVictory: false }
          const matchId = 1;

          component.fightRound(matchId, { id: HAND_SHAPES.Rock, name: 'Rock' });
          gameServiceSpy.evtRestResponse$.next({ requestId: fightRoundMockId, action: ServiceActions.Game.FIGHT_ROUND, data: mockResult });
          fixture.detectChanges();

          const icon = fixture.debugElement.query(By.css('#user-selected-shape i'))
          const iconClass = (icon.nativeElement as HTMLElement).className;
          const rockClass = 'fa-hand-back-fist';
          expect(iconClass).toContain(rockClass)
        })
        it('should display the CPU shape', () => {
          const mockResult: RoundOutcome = { cpuShapeId: HAND_SHAPES.Paper, isTie: true, isUserVictory: false }
          const matchId = 1;

          component.fightRound(matchId, { id: HAND_SHAPES.Rock, name: 'Rock' });
          gameServiceSpy.evtRestResponse$.next({ requestId: fightRoundMockId, action: ServiceActions.Game.FIGHT_ROUND, data: mockResult });
          fixture.detectChanges();

          const icon = fixture.debugElement.query(By.css('#cpu-selected-shape i'))
          const iconClass = (icon.nativeElement as HTMLElement).className;
          const paperClass = 'fa-hand';
          expect(iconClass).toContain(paperClass)
        })
      });
    })
  })
});
