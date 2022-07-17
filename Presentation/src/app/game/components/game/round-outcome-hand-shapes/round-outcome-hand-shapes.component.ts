import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../../../services/game.service';
import { HandShape } from '../../../../shared/interfaces/hand-shape.interface';
import { RoundOutcome } from '../../../../shared/interfaces/round-outcome.interface';

@Component({
  selector: 'app-round-outcome-hand-shapes',
  templateUrl: './round-outcome-hand-shapes.component.html',
  styles: [
  ]
})
export class RoundOutcomeHandShapesComponent implements OnInit {

  @Input() currentRound!: number;
  @Input() roundOutcome?: RoundOutcome;

  roundOutcome$ = this.gameService.selectors.selectRoundOutcome;
  userHandShape$ = this.gameService.selectors.selectUserHandShape;
  cpuHandShape$ = this.gameService.selectors.selectCpuHandShape;

  constructor(private readonly gameService: GameService) { }

  ngOnInit(): void {
  }

}
