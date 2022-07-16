import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Observable, Subscription, tap, withLatestFrom } from 'rxjs';
import { GameService } from '../../../services/game.service';
import { ServiceActions } from '../../../services/service-actions';
import { DD_FIGHT_ROUND_RESULT } from '../../../shared/enums/dd-fight-round-result.enum';
import { FightRoundResult } from '../../../shared/interfaces/fight-round-result.interface';
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
  handShapes$: Observable<HandShape[]> = this.gameService.evtRestResponse$.pipe(
    filter(response => response.action === ServiceActions.Game.GET_HAND_SHAPES),
    map(utils.mapResponseData)
  )

  /** Retrieve the created match id */
  matchId$: Observable<number> = this.gameService.selectors.selectMatchId;

  /** Retrieve the fight round result. Contains the cpu shape and the outcome */
  fightRoundResult$: Observable<FightRoundResult> = this.gameService.evtRestResponse$.pipe(
    filter(response => response.action === ServiceActions.Game.FIGHT_ROUND),
    map(utils.mapResponseData),
  )

  /** Result of the CPU shape */
  cpuHandShape$: Observable<HandShape | undefined> = this.fightRoundResult$.pipe(
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

  public readonly DD_FIGHT_ROUND_RESULT = DD_FIGHT_ROUND_RESULT;
  isMatchFinished = false;
  matchResult?: DD_FIGHT_ROUND_RESULT;

  /** Store the round results to display the final result */
  private roundResults: DD_FIGHT_ROUND_RESULT[] = []

  /** Store the subscriptions to cleanup on destroy */
  private cleanupSubscriptions: Subscription[] = [];

  constructor(private readonly gameService: GameService) { }

  ngOnInit(): void {
    this.createMatch();
    this.gameService.getHandShapes();

    this.cleanupSubscriptions = [
      this.fightRoundResult$.subscribe(this.processFightRoundResult)
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
    this.isMatchFinished = false;
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

  private processFightRoundResult = (fightRoundResult: FightRoundResult) => {
    const { Victory: VICTORY, Loss: LOSS, Tie: TIE } = DD_FIGHT_ROUND_RESULT;
    const fightResult = fightRoundResult.isTie ? TIE : fightRoundResult.isUserVictory ? VICTORY : LOSS;
    this.roundResults.push(fightResult);

    const minRoundsToWin = Math.floor(this.currentRoundsPerMatch / 2) + 1;

    const userVictories = this.roundResults.filter(r => r === VICTORY).length;
    const cpuVictories = this.roundResults.filter(r => r === LOSS).length;

    this.isMatchFinished = this.currentRound > this.currentRoundsPerMatch ||
      userVictories >= minRoundsToWin || cpuVictories >= minRoundsToWin;

    if (this.isMatchFinished) {
      this.matchResult = this.isMatchFinished && (
        userVictories === cpuVictories ? TIE : userVictories > cpuVictories ? VICTORY : LOSS
      );
    }
  }

  public matchResultToString = (result: DD_FIGHT_ROUND_RESULT) => result === DD_FIGHT_ROUND_RESULT.Tie ? 'Tie' : result === DD_FIGHT_ROUND_RESULT.Victory ? 'Victory' : 'Loss'
}
