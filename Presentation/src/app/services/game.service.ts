import { Injectable } from '@angular/core';
import { filter, map, withLatestFrom } from 'rxjs';
import { HAND_SHAPES } from '../shared/enums/hand-shapes.enum';
import { HandShape } from '../shared/interfaces/hand-shape.interface';
import { RoundOutcome } from '../shared/interfaces/round-outcome.interface';
import { utils } from '../shared/util/utils';
import { HttpService } from './http.service';
import { ServiceActions } from './service-actions';

@Injectable({
  providedIn: 'root'
})
export class GameService extends HttpService {
  protected override readonly apiUrl = 'rock-paper-scissors';

  private readonly selectHandShapes = this.createSelector<HandShape[]>(ServiceActions.Game.GET_HAND_SHAPES);
  private readonly selectMatchId = this.createSelector<number>(ServiceActions.Game.CREATE_MATCH);
  private readonly selectRoundOutcome = this.createSelector<RoundOutcome>(ServiceActions.Game.FIGHT_ROUND);

  /** Selectors for the different events */
  public selectors = {
    /** Retrieve the possible hand shapes */
    selectHandShapes: this.selectHandShapes,
    /** Retrieve the created match id */
    selectMatchId: this.selectMatchId,
    /** Retrieve the fight round result. Contains the cpu shape and the outcome */
    selectRoundOutcome: this.selectRoundOutcome,
    /** User hand shape selection */
    selectUserHandShape: this.selectRoundOutcome.pipe(
      withLatestFrom(this.selectHandShapes),
      map(([fightRoundResult, handShapes]) => handShapes.find(hs => hs.id === fightRoundResult.userShapeId))
    ),
    /** CPU hand shape selection */
    selectCpuHandShape: this.selectRoundOutcome.pipe(
      withLatestFrom(this.selectHandShapes),
      map(([fightRoundResult, handShapes]) => handShapes.find(hs => hs.id === fightRoundResult.cpuShapeId))
    )
  }

  /**
   * Creates a selector for the service action result
   * @param action Service action type to listen to
   * @returns selector
   */
  private createSelector<Result>(action: string) {
    return this.evtRestResponse$.pipe(
      filter(response => response.action === action),
      map(response => utils.mapResponseData<Result>(response)),
    )
  }

  /**
   * Gets the hand shapes
   * @returns Correlation id
   */
  public getHandShapes(): string {
    return super.get({ endpoint: 'hand-shapes', action: ServiceActions.Game.GET_HAND_SHAPES });
  }

  /**
   * Gets the hand shapes
   * @returns Correlation id
   */
  public createMatch(): string {
    return super.post({ endpoint: 'create-match', action: ServiceActions.Game.CREATE_MATCH });
  }

  /**
   * Fights a round of the game
   * @param userShapeId user selection
   * @returns Correlation id
   */
  public fightRound(matchId: number, userShapeId: HAND_SHAPES): string {
    return super.post({ endpoint: `${matchId}/fight-round`, action: ServiceActions.Game.FIGHT_ROUND }, userShapeId);
  }
}
