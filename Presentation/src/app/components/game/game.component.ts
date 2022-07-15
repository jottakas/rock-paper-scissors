import { Component, OnInit } from '@angular/core';
import { concat, filter, forkJoin, map, mergeMap, Observable, tap, withLatestFrom } from 'rxjs';
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
export class GameComponent implements OnInit {

  handShapes$: Observable<HandShape[]> = this.gameService.evtRestResponse$.pipe(
    filter(response => response.requestId === this.getHandShapesRequestId),
    map(response => response.data)
  )

  fightRoundResult$: Observable<FightRoundResult> = this.gameService.evtRestResponse$.pipe(
    filter(response => response.requestId === this.fightRoundRequestId),
    map(response => response.data)
  )

  /** Result of the CPU shape */
  cpuHandShape$: Observable<HandShape | undefined> = this.fightRoundResult$.pipe(
    tap(r => console.log('ddd1', r)),
    withLatestFrom(this.handShapes$),
    tap(r => console.log('ddd2', r)),
    map(([fightRoundResult, handShapes]) => handShapes.find(hs => hs.id === fightRoundResult.cpuShapeId))
  )
  // ([this.handShapes$, this.fightRoundResult$]).pipe(
  //   map(
  //     ([handShapes, fightRoundResult]) => handShapes.find(hs => hs.id === fightRoundResult.cpuShapeId)
  //   )
  // );

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
