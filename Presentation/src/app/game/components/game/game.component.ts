import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Observable, Subscription, withLatestFrom } from 'rxjs';
import { GameService } from '../../../services/game.service';
import { DD_OUTCOME } from '../../../shared/enums/dd-outcome.enum';
import { HandShape } from '../../../shared/interfaces/hand-shape.interface';
import { RoundOutcome } from '../../../shared/interfaces/round-outcome.interface';
import { utils } from '../../../shared/util/utils';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styles: [
  ]
})
export class GameComponent implements OnInit, OnDestroy {

  /** Retrieve the possible hand shapes */
  handShapes$ = this.gameService.selectors.selectHandShapes;
  /** Retrieve the created match id */
  matchId$ = this.gameService.selectors.selectMatchId;
  /** Retrieve the fight round result. Contains the cpu shape and the outcome */
  roundOutcome$ = this.gameService.selectors.selectRoundOutcome;

  /** Result of the CPU shape */
  cpuHandShape$ = this.gameService.selectors.selectCpuHandShape;

  /** Selection of the user to display */
  userHandShape$ = this.gameService.selectors.selectUserHandShape;

  /** Possible server errors */
  errors$ = this.gameService.evtRestResponse$.pipe(
    filter(response => utils.isNotNullNorUndefined(response)),
    map(response => utils.isNotNullNorUndefined(response.error))
  )

  /** Current rounds per match */
  roundsPerMatch = 5;
  /** Current round playing */
  currentRound: number = 1;

  matchResult?: DD_OUTCOME;

  /** Store the round results to display the final result */
  private roundResults: DD_OUTCOME[] = []

  /** Store the subscriptions to cleanup on destroy */
  private cleanupSubscriptions: Subscription[] = [];

  constructor(private readonly gameService: GameService) { }

  ngOnInit(): void {
    this.createMatch();
    this.gameService.getHandShapes();

    this.cleanupSubscriptions = [
      this.roundOutcome$.subscribe(this.processFightRoundResult)
    ]
  }

  ngOnDestroy(): void {
    utils.unsubscribe(this.cleanupSubscriptions);
  }

  /**
   * Asks the user if he wants to create a new match
   */
  askCreateMatch() {
    const isCreateMatch = confirm('Do you want to start another match? You will not see the current stats anymore although they are still in the database')
    if (isCreateMatch)
      this.createMatch();
  }

  /**
  * Asks the user if he wants to create a new match
  */
  changeRoundsPerMatch(newRoundsPerMatch: number) {
    const isConfirmed = confirm('Do you want to start another match? You will not see the current stats anymore although they are still in the database')
    if (isConfirmed) {
      this.roundsPerMatch = newRoundsPerMatch;
      this.createMatch();
      alert('Rounds changed')
    }
  }

  /** Creates a new match */
  public createMatch = () => {
    this.matchResult = undefined;
    this.currentRound = 1;
    this.roundResults = [];

    this.gameService.createMatch();
  }
  /**
   * Send the user selection to fight the cpu
   * @param matchId match id to fight the round
   * @param handShape user selection
   */
  fightRound(matchId: number, handShape: HandShape) {
    this.currentRound++;
    this.gameService.fightRound(matchId, handShape.id);
  }

  private processFightRoundResult = (fightRoundResult: RoundOutcome) => {
    const { Victory: VICTORY, Loss: LOSS, Tie: TIE } = DD_OUTCOME;
    const fightResult = fightRoundResult.isTie ? TIE : fightRoundResult.isUserVictory ? VICTORY : LOSS;
    this.roundResults.push(fightResult);

    const minRoundsToWin = Math.floor(this.roundsPerMatch / 2) + 1;

    const userVictories = this.roundResults.filter(r => r === VICTORY).length;
    const cpuVictories = this.roundResults.filter(r => r === LOSS).length;

    // The match is finished when the rounds are finished
    // or someone has the minimum amount of wins
    const isMatchFinished = this.currentRound > this.roundsPerMatch ||
      userVictories >= minRoundsToWin || cpuVictories >= minRoundsToWin;

    this.matchResult = undefined;
    if (isMatchFinished) {
      this.matchResult = userVictories === cpuVictories ? TIE : userVictories > cpuVictories ? VICTORY : LOSS;
      setTimeout(() => alert(`Match outcome: ${utils.outcomeToString(this.matchResult!)}`))
    }
  }
}
