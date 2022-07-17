import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameService } from '../../../../services/game.service';
import { HandShape } from '../../../../shared/interfaces/hand-shape.interface';

@Component({
  selector: 'app-user-hand-shape-input',
  templateUrl: './user-hand-shape-input.component.html',
  styles: [
  ]
})
export class UserHandShapeInputComponent implements OnInit {

  @Input() isMatchFinished: boolean = false;
  @Input() currentRound: number = 1;
  @Input() roundsPerMatch: number = 5;

  @Output() evtShapeSelected: EventEmitter<HandShape> = new EventEmitter();
  @Output() evtNewMatch: EventEmitter<void> = new EventEmitter();

  handShapes$ = this.gameService.selectors.selectHandShapes;

  constructor(private readonly gameService: GameService) { }

  ngOnInit(): void {
  }

}
