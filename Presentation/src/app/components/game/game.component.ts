import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Observable, Subscription, take } from 'rxjs';
import { FightRoundResult } from 'src/app/shared/interfaces/fight-round-result.interface';
import { HandShape } from 'src/app/shared/interfaces/hand-shape.interface';
import { GameService } from '../../services/game.service';
import { HAND_SHAPES } from '../../shared/enums/hand-shapes.enum';
import { utils } from '../../shared/util/utils';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styles: [
  ]
})
export class GameComponent implements OnInit, OnDestroy {

  handShapes$: Observable<HandShape[]> = this.gameService.evtRestResponse$.pipe(
    filter(response => response.requestId === this.getHandShapesRequestId),
    map(response => response.data)
  )

  fightRoundResult$: Observable<FightRoundResult> = this.gameService.evtRestResponse$.pipe(
    filter(response => response.requestId === this.fightRoundRequestId),
    map(response => response.data)
  )

  errors$ = this.gameService.evtRestResponse$.pipe(
    filter(response => utils.isNotNullNorUndefined(response)),
    map(response => utils.isNotNullNorUndefined(response.error))
  )

  private getHandShapesRequestId = '';
  private fightRoundRequestId = '';

  /** Result of the CPU */
  public cpuHandShape?: HandShape;

  /** Store subscriptions for cleanup */
  private cleanupSubscriptions: Subscription[] = [];

  constructor(private readonly gameService: GameService) { }

  ngOnInit(): void {
    this.getHandShapesRequestId = this.gameService.getHandShapes();

    this.cleanupSubscriptions = [
      this.fightRoundResult$.subscribe(this.processCpuShape)
    ]
  }

  ngOnDestroy(): void {
    utils.unsubscribe(this.cleanupSubscriptions);
  }

  fightRound(shapeId: HAND_SHAPES) {
    this.fightRoundRequestId = this.gameService.fightRound(shapeId);
  }

  private processCpuShape = (fightRoundResult: FightRoundResult) => {
    this.handShapes$
      .pipe(take(1))
      .subscribe(handShapes => this.cpuHandShape = handShapes.find(hs => hs.id === fightRoundResult.cpuShapeId));
  }
}
