import { Injectable } from '@angular/core';
import { HAND_SHAPES } from '../shared/enums/hand-shapes.enum';
import { HttpService } from './http.service';
import { ServiceActions } from './service-actions';

@Injectable({
  providedIn: 'root'
})
export class GameService extends HttpService {
  protected override readonly apiUrl = 'rock-paper-scissors';

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
