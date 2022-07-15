import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, withLatestFrom } from 'rxjs';
import { FightRoundResult } from 'src/app/shared/interfaces/fight-round-result.interface';
import { HandShape } from 'src/app/shared/interfaces/hand-shape.interface';
import { GameService } from '../../services/game.service';
import { utils } from '../../shared/util/utils';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styles: [
  ]
})
export class GameComponent implements OnInit {

  /** Retrieve the possible hand shapes */
  handShapes$: Observable<HandShape[]> = this.gameService.evtRestResponse$.pipe(
    filter(response => response.requestId === this.getHandShapesRequestId),
    map(response => response.data)
  )

  /** Retrieve the fight round result. Contains the cpu shape and the outcome */
  fightRoundResult$: Observable<FightRoundResult> = this.gameService.evtRestResponse$.pipe(
    filter(response => response.requestId === this.fightRoundRequestId),
    map(response => response.data)
  )

  /** Result of the CPU shape */
  cpuHandShape$: Observable<HandShape | undefined> = this.fightRoundResult$.pipe(
    withLatestFrom(this.handShapes$),
    map(([fightRoundResult, handShapes]) => handShapes.find(hs => hs.id === fightRoundResult.cpuShapeId))
  )

  /** Selection of the user to display */
  userSelectedShape: HandShape | undefined;

  /** Possible server errors */
  errors$ = this.gameService.evtRestResponse$.pipe(
    filter(response => utils.isNotNullNorUndefined(response)),
    map(response => utils.isNotNullNorUndefined(response.error))
  )

  /** Correlation id of the request */
  private getHandShapesRequestId = '';
  /** Correlation id of the request */
  private fightRoundRequestId = '';

  constructor(private readonly gameService: GameService) { }

  ngOnInit(): void {
    this.getHandShapesRequestId = this.gameService.getHandShapes();
  }

  /**
   * Send the user selection to fight the cpu
   * @param handShape user selection
   */
  fightRound(handShape: HandShape) {
    this.userSelectedShape = handShape;
    this.fightRoundRequestId = this.gameService.fightRound(handShape.id);
  }
}
