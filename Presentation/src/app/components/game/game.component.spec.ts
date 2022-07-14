import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { cold, hot } from 'jasmine-marbles';
import { Subject } from 'rxjs';
import { GameService } from '../../services/game.service';
import { HAND_SHAPES } from '../../shared/enums/hand-shapes.enum';
import { HandShape } from '../../shared/interfaces/hand-shape.interface';

import { GameComponent } from './game.component';
import { HandShapeComponent } from './hand-shape/hand-shape.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  let gameServiceSpy: jasmine.SpyObj<GameService>;
  const getHandShapesMockId = 'get hand shapes mock id';
  const fightRoundMockId = 'fight round mock id';

  beforeEach(async () => {
    gameServiceSpy = jasmine.createSpyObj('Game Service', ['getHandShapes', 'fightRound'], { 'evtRestResponse$': new Subject() });
    gameServiceSpy.getHandShapes.and.returnValue(getHandShapesMockId)
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
    describe('Hand shape retrieval', () => {

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
        gameServiceSpy.evtRestResponse$.next({ requestId: getHandShapesMockId, data: mockShapes });
      })
    })

    describe('Fight round', () => {
      it('should send the selected shape to fight the round', () => {
        const selectedShape = HAND_SHAPES.Rock;
        component.fightRound(selectedShape);
        expect(gameServiceSpy.fightRound).toHaveBeenCalledWith(selectedShape);
      })
      it('should display the win', () => {
        component.fightRound(HAND_SHAPES.Rock);
        gameServiceSpy.evtRestResponse$.next({ requestId: fightRoundMockId, data: true });
        fixture.detectChanges();

        const container = fixture.debugElement.query(By.css('#fight-round-result'));
        expect((container.nativeElement as HTMLElement).textContent?.toLowerCase()).toContain('win')
      })
      it('should display the loss', () => {
        component.fightRound(HAND_SHAPES.Rock);
        gameServiceSpy.evtRestResponse$.next({ requestId: fightRoundMockId, data: false });
        fixture.detectChanges();

        const container = fixture.debugElement.query(By.css('#fight-round-result'));
        expect((container.nativeElement as HTMLElement).textContent?.toLowerCase()).toContain('loss')
      })
    })
  })
});
