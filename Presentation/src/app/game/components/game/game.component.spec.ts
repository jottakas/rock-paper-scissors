import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { GameService } from '../../../services/game.service';
import { ServiceActions } from '../../../services/service-actions';
import { HAND_SHAPES } from '../../../shared/enums/hand-shapes.enum';
import { RoundOutcome } from '../../../shared/interfaces/round-outcome.interface';
import { HandShape } from '../../../shared/interfaces/hand-shape.interface';

import { GameComponent } from './game.component';
import { HandShapeComponent } from './hand-shape/hand-shape.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  let gameServiceSpy: jasmine.SpyObj<GameService>;
  const getHandShapesMockId = 'get hand shapes mock id';
  const createMatchMockId = 'create match mock id';
  const fightRoundMockId = 'fight round mock id';

  beforeEach(async () => {
    gameServiceSpy = jasmine.createSpyObj('Game Service', ['getHandShapes', 'createMatch', 'fightRound'], { 'evtRestResponse$': new Subject() });
    gameServiceSpy.getHandShapes.and.returnValue(getHandShapesMockId)
    gameServiceSpy.createMatch.and.returnValue(createMatchMockId)
    gameServiceSpy.fightRound.and.returnValue(fightRoundMockId)

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [GameComponent, HandShapeComponent],
      providers: [
        {
          provide: GameService,
          useValue: gameServiceSpy
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Methods', () => {
    describe('Match creation', () => {
      it('should retrieve the match id', () => {
        expect(gameServiceSpy.createMatch).toHaveBeenCalled();
      })
      it('should assign the data to the match id property', (fnDone) => {
        // Arrange
        const mockMatchId = 1;

        // Assert
        component.matchId$.subscribe(result => {
          expect(result).toEqual(mockMatchId);
          fnDone();
        });

        // Act
        gameServiceSpy.evtRestResponse$.next({ requestId: createMatchMockId, action: ServiceActions.Game.CREATE_MATCH, data: mockMatchId });
      })
    })

    describe('Hand shape retrieval', () => {

      beforeEach(() => {
        gameServiceSpy.evtRestResponse$.next({ requestId: createMatchMockId, action: ServiceActions.Game.CREATE_MATCH, data: 1 });
      });

      it('should retrieve the data', () => {
        expect(gameServiceSpy.getHandShapes).toHaveBeenCalled();
      })
      it('should assign the data to the handShapes property', (fnDone) => {
        // Arrange
        const mockShapes: HandShape[] = [{
          id: HAND_SHAPES.Rock,
          name: 'Rock'
        }];

        // Assert
        component.handShapes$.subscribe(result => {
          expect(result).toEqual(mockShapes);
          fnDone();
        });

        // Act
        gameServiceSpy.evtRestResponse$.next({ requestId: getHandShapesMockId, action: ServiceActions.Game.GET_HAND_SHAPES, data: mockShapes });
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
        const getResultContent = () => {
          const container = fixture.debugElement.query(By.css('#round-outcome'))
          return (container.nativeElement as HTMLElement).textContent?.toLowerCase();
        };
        it('should display the tie', () => {
          const mockResult: RoundOutcome = { cpuShapeId: HAND_SHAPES.Rock, isTie: true, isUserVictory: false }
          const matchId = 1;

          component.fightRound(matchId, { id: HAND_SHAPES.Rock, name: 'Rock' });
          gameServiceSpy.evtRestResponse$.next({ requestId: fightRoundMockId, action: ServiceActions.Game.FIGHT_ROUND, data: mockResult });
          fixture.detectChanges();

          const result = getResultContent();
          expect(result).toContain('tie')
        })
        it('should display the victory', () => {
          const mockResult: RoundOutcome = { cpuShapeId: HAND_SHAPES.Rock, isTie: false, isUserVictory: true }
          const matchId = 1;

          component.fightRound(matchId, { id: HAND_SHAPES.Rock, name: 'Rock' });
          gameServiceSpy.evtRestResponse$.next({ requestId: fightRoundMockId, action: ServiceActions.Game.FIGHT_ROUND, data: mockResult });
          fixture.detectChanges();

          const result = getResultContent();
          expect(result).toContain('victory')
        })
        it('should display the loss', () => {
          const mockResult: RoundOutcome = { cpuShapeId: HAND_SHAPES.Rock, isTie: false, isUserVictory: false }
          const matchId = 1;

          component.fightRound(matchId, { id: HAND_SHAPES.Rock, name: 'Rock' });
          gameServiceSpy.evtRestResponse$.next({ requestId: fightRoundMockId, action: ServiceActions.Game.FIGHT_ROUND, data: mockResult });
          fixture.detectChanges();

          const result = getResultContent();
          expect(result).toContain('loss')
        })

        it('should display the user shape', () => {
          const mockResult: RoundOutcome = { cpuShapeId: HAND_SHAPES.Paper, isTie: true, isUserVictory: false }
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

          const icon = fixture.debugElement.query(By.css('#user-selected-shape i'))
          const iconClass = (icon.nativeElement as HTMLElement).className;
          const paperClass = 'fa-hand';
          expect(iconClass).toContain(paperClass)
        })
      });
    })
  })
});
