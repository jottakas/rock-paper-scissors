import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-rounds-per-match-input',
  templateUrl: './user-rounds-per-match-input.component.html',
  styles: [
  ]
})
export class UserRoundsPerMatchInputComponent implements OnInit {

  @Input() currentRoundsPerMatch: number = 5;
  @Output() evtChangeRoundsPerMatch = new EventEmitter<number>();

  newRoundsPerMatch: number = 5;

  constructor() { }

  ngOnInit(): void {
  }

}
