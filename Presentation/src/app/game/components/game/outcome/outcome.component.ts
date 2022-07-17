import { Component, Input, OnInit } from '@angular/core';
import { DD_OUTCOME } from '../../../../shared/enums/dd-outcome.enum';
import { utils } from '../../../../shared/util/utils';

@Component({
  selector: 'app-outcome',
  templateUrl: './outcome.component.html',
  styles: [
  ]
})
export class OutcomeComponent implements OnInit {

  @Input() outcome?: DD_OUTCOME;
  @Input() header: string = 'Outcome';

  readonly ROUND_OUTCOME = DD_OUTCOME;
  readonly outcomeToString = utils.outcomeToString;

  constructor() { }

  ngOnInit(): void {
  }

}
