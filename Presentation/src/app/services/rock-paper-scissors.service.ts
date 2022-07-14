import { Injectable } from '@angular/core';
import { HandShapeEnum } from '../shared/enums/hand-shape.enum';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class RockPaperScissorsService extends HttpService {
  protected override readonly apiUrl = 'rock-paper-scissors';

  /**
   * Gets the hand shapes
   * @returns Correlation id
   */
   public getHandShapes(): string {
    return super.get('hand-shapes');
  }

  /**
   * Fights a round of the game
   * @returns Correlation id
   */
   public fightRound(id: HandShapeEnum): string {
    return super.post('fight-round', id);
  }
}
