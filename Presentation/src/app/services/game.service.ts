import { Injectable } from '@angular/core';
import { HAND_SHAPES } from '../shared/enums/hand-shapes.enum';
import { HttpService } from './http.service';

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
    return super.get('hand-shapes');
  }

  /**
   * Gets the hand shapes
   * @returns Correlation id
   */
  public createMatch(): string {
    return super.post('create-match');
  }

  /**
   * Fights a round of the game
   * @param userShapeId user selection
   * @returns Correlation id
   */
  public fightRound(matchId: number, userShapeId: HAND_SHAPES): string {
    return super.post(`${matchId}/fight-round`, userShapeId);
  }
}
