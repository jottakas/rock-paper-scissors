import { Component, Input, OnInit } from '@angular/core';
import { RoundOutcome } from '../../../../shared/interfaces/round-outcome.interface';
import { HandShape } from '../../../../shared/interfaces/hand-shape.interface';

@Component({
  selector: 'app-round-outcome-hand-shapes',
  templateUrl: './round-outcome-hand-shapes.component.html',
  styles: [
  ]
})
export class RoundOutcomeHandShapesComponent implements OnInit {

  @Input() currentRound!: number;
  @Input() cpuHandShape?: HandShape;
  @Input() userSelectedShape?: HandShape;
  @Input() roundOutcome?: RoundOutcome;

  constructor() { }

  ngOnInit(): void {
  }

}
