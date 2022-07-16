import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HAND_SHAPES } from '../../../../shared/enums/hand-shapes.enum';
import { HandShape } from '../../../../shared/interfaces/hand-shape.interface';

@Component({
  selector: 'app-hand-shape',
  templateUrl: './hand-shape.component.html',
  styles: [
  ]
})
export class HandShapeComponent implements OnInit {

  readonly HAND_SHAPES = HAND_SHAPES;

  @Input() handShape?: HandShape;
  /** To display the hand shape without click styles nor events */
  @Input() isDisabled: boolean = false;
  @Output() evtClick: EventEmitter<HandShape> = new EventEmitter();

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
