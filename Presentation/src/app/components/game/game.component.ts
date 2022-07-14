import { Component, OnInit } from '@angular/core';
import { HandShapeEnum } from 'src/app/shared/enums/hand-shape.enum';
import { HandShape } from 'src/app/shared/interfaces/hand-shape.interface';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styles: [
  ]
})
export class GameComponent implements OnInit {

  handShape: HandShape = {
    id: HandShapeEnum.Rock,
    name: 'Rock'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
