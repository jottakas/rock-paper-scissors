import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HandShape } from 'src/app/shared/interfaces/hand-shape.interface';
import { HAND_SHAPES } from '../../../shared/enums/hand-shapes.enum';

@Component({
  selector: 'app-hand-shape',
  templateUrl: './hand-shape.component.html',
  styles: [
  ]
})
export class HandShapeComponent implements OnInit {

  readonly HAND_SHAPES = HAND_SHAPES;

  @Input() handShape?: HandShape;
  @Output() evtClick: EventEmitter<HAND_SHAPES> = new EventEmitter();

  /** Adds a hover background to the card */
  isHover: boolean = false;

  public readonly shapeIdToIcon = {
    [HAND_SHAPES.Rock]: 'fa-hand-back-fist',
    [HAND_SHAPES.Paper]: 'fa-hand',
    [HAND_SHAPES.Scissors]: 'fa-hand-scissors',
  }

  constructor() { }

  ngOnInit(): void {
  }

}
