import { Component, Input, OnInit } from '@angular/core';
import { HandShape } from 'src/app/shared/interfaces/hand-shape.interface';

@Component({
  selector: 'app-hand-shape',
  templateUrl: './hand-shape.component.html',
  styles: [
  ]
})
export class HandShapeComponent implements OnInit {

  
  @Input() handShape!: HandShape;

  constructor() { }

  ngOnInit(): void {
  }

}
