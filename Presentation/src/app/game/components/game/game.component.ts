import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Observable, Subscription, tap, withLatestFrom } from 'rxjs';
import { GameService } from '../../../services/game.service';
import { ServiceActions } from '../../../services/service-actions';
import { ROUND_OUTCOME } from '../../../shared/enums/round-outcome.enum';
import { RoundOutcome as RoundOutcome } from '../../../shared/interfaces/round-outcome.interface';
import { HandShape } from '../../../shared/interfaces/hand-shape.interface';
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
  cpuHandShape$: Observable<HandShape | undefined> = this.roundOutcome$.pipe(
    withLatestFrom(this.handShapes$),
    map(([fightRoundResult, handShapes]) => handShapes.find(hs => hs.id === fightRoundResult.cpuShapeId))
  )

  /** Selection of the user to display */
  userSelectedShape: HandShape | undefined;

  /** Possible server errors */
  errors$ = this.gameService.evtRestResponse$.pipe(
    filter(response => utils.isNotNullNorUndefined(response)),
    map(response => utils.isNotNullNorUndefined(response.error))
  )

  /** Current rounds per match */
  currentRoundsPerMatch = 5;
  /** User input to modify the current rounds per match */
  newRoundsPerMatch = this.currentRoundsPerMatch;
  /** Current round playing */
  currentRound: number = 1;

  public readonly DD_FIGHT_ROUND_RESULT = ROUND_OUTCOME;
  matchResult?: ROUND_OUTCOME;

  /** Store the round results to display the final result */
  private roundResults: ROUND_OUTCOME[] = []

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
      this.currentRoundsPerMatch = newRoundsPerMatch;
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
   * @param handShape user selection
   */
  fightRound(matchId: number, handShape: HandShape) {
    this.currentRound++;
    this.userSelectedShape = handShape;

    this.gameService.fightRound(matchId, handShape.id);
  }

  private processFightRoundResult = (fightRoundResult: RoundOutcome) => {
    const { Victory: VICTORY, Loss: LOSS, Tie: TIE } = ROUND_OUTCOME;
    const fightResult = fightRoundResult.isTie ? TIE : fightRoundResult.isUserVictory ? VICTORY : LOSS;
    this.roundResults.push(fightResult);

    const minRoundsToWin = Math.floor(this.currentRoundsPerMatch / 2) + 1;

    const userVictories = this.roundResults.filter(r => r === VICTORY).length;
    const cpuVictories = this.roundResults.filter(r => r === LOSS).length;

    const isMatchFinished = this.currentRound > this.currentRoundsPerMatch ||
      userVictories >= minRoundsToWin || cpuVictories >= minRoundsToWin;

    this.matchResult = undefined;
    if (isMatchFinished) {
      this.matchResult = userVictories === cpuVictories ? TIE : userVictories > cpuVictories ? VICTORY : LOSS;
      setTimeout(() => alert(`Match outcome: ${this.matchResultToString(this.matchResult!)}`))
    }
  }

  public matchResultToString = (result: ROUND_OUTCOME) => result === ROUND_OUTCOME.Tie ? 'Tie' : result === ROUND_OUTCOME.Victory ? 'Victory' : 'Loss'
}
