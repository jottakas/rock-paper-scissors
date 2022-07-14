import { Component, Input, OnInit } from '@angular/core';
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

  @Input() handShape!: HandShape;

  constructor() { }

  ngOnInit(): void {
  }

}
