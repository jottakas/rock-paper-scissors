import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, tap, withLatestFrom } from 'rxjs';
import { GameService } from '../../../services/game.service';
import { FightRoundResult } from '../../../shared/interfaces/fight-round-result.interface';
import { HandShape } from '../../../shared/interfaces/hand-shape.interface';
import { utils } from '../../../shared/util/utils';

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
    map(utils.mapResponseData)
  )

  /** Retrieve the created match id */
  matchId$: Observable<number> = this.gameService.evtRestResponse$.pipe(
    filter(response => response.requestId === this.createMatchRequestId),
    map(utils.mapResponseData),
    // After creating the match, retrieve the hand shapes via side effect
    tap(() => this.getHandShapesRequestId = this.gameService.getHandShapes())
  )

  /** Retrieve the fight round result. Contains the cpu shape and the outcome */
  fightRoundResult$: Observable<FightRoundResult> = this.gameService.evtRestResponse$.pipe(
    filter(response => response.requestId === this.fightRoundRequestId),
    map(utils.mapResponseData)
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
  /** Correlation id of the match creation */
  private createMatchRequestId = '';
  /** Correlation id of the request */
  private fightRoundRequestId = '';

  constructor(private readonly gameService: GameService) { }

  ngOnInit(): void {
    this.createMatch();
  }

  /**
   * Asks the user if he wants to create a new match
   */
  askCreateMatch() {
    const isCreateMatch = confirm('Do you want to start another match? You will not see the current stats anymore although they are still in the database')
    if (isCreateMatch)
      this.createMatch();
  }

  /** Creates a new match */
  private createMatch = () => {
    this.createMatchRequestId = this.gameService.createMatch();
  }
  /**
   * Send the user selection to fight the cpu
   * @param handShape user selection
   */
  fightRound(matchId: number, handShape: HandShape) {
    this.userSelectedShape = handShape;
    this.fightRoundRequestId = this.gameService.fightRound(matchId, handShape.id);
  }
}
