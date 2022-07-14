import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { GameService } from '../../services/game.service';
import { HAND_SHAPES } from '../../shared/enums/hand-shapes.enum';
import { utils } from '../../shared/util/utils';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styles: [
  ]
})
export class GameComponent implements OnInit {

  handShapes$ = this.gameService.evtRestResponse$.pipe(
    filter(response => response.requestId === this.getHandShapesRequestId),
    map(response => response.data)
  )

  fightRoundResult$ = this.gameService.evtRestResponse$.pipe(
    filter(response => response.requestId === this.fightRoundRequestId),
    map(response => response.data),
  )

  errors$ = this.gameService.evtRestResponse$.pipe(
    filter(response => utils.isNotNullNorUndefined(response)),
    map(response => utils.isNotNullNorUndefined(response.error))
  )

  private getHandShapesRequestId = '';
  private fightRoundRequestId = '';

  constructor(private readonly gameService: GameService) { }

  ngOnInit(): void {
    this.getHandShapesRequestId = this.gameService.getHandShapes();
  }

  fightRound(shapeId: HAND_SHAPES) {
    this.fightRoundRequestId = this.gameService.fightRound(shapeId);
  }

}
