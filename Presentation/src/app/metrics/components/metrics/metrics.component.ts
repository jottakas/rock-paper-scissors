import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Observable, Subscription } from 'rxjs';
import { GameService } from '../../../services/game.service';
import { MetricsService } from '../../../services/metrics.service';
import { ROUND_OUTCOME } from '../../../shared/enums/round-outcome.enum';
import { MatchMetrics } from '../../../shared/interfaces/match-metrics.interface';
import { Match } from '../../../shared/interfaces/match.interface';
import { utils } from '../../../shared/util/utils';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styles: [
  ]
})
export class MetricsComponent implements OnInit, OnDestroy {

  public matches$ = this.metricsService.evtRestResponse$.pipe(
    filter(utils.isResponseWithData),
    map(utils.mapResponseData)
  );

  /** Retrieve the created match id */
  currentMatchId$: Observable<number> = this.gameService.selectors.selectMatchId;

  public currentMatchMetrics: MatchMetrics = this.initMatchMetrics();

  /** Store the subscriptions to cleanup on destroy */
  private cleanupSubscriptions: Subscription[] = [];

  constructor(private gameService: GameService,
    private metricsService: MetricsService) { }

  ngOnInit(): void {
    this.cleanupSubscriptions = [
      this.gameService.evtRestResponse$.subscribe(() => {
        this.metricsService.getMatches();
      }),
      this.matches$.subscribe(this.processMatches)
    ]
  }

  ngOnDestroy(): void {
    utils.unsubscribe(this.cleanupSubscriptions);
  }

  private initMatchMetrics() {
    return {
      matchId: -1,
      victories: 0,
      losses: 0,
      ties: 0,
      victoryRate: 0,
      lossRate: 0,
      tieRate: 0,
      roundsPlayed: 0
    }
  };

  /**
   * Processes the matches to create the latest match metrics
   * @param matches List of all the matches
   */
  private processMatches = (matches: Match[]) => {
    const maxMatchId = Math.max(...matches.map(m => m.id));
    const currentMatch = matches.find(m => m.id === maxMatchId)!;

    const { rounds } = currentMatch;
    const roundsPlayed = rounds.length;

    this.currentMatchMetrics = this.initMatchMetrics();

    if (roundsPlayed > 0) {
      const victoryRounds = rounds.filter(r => r.resultDto?.id === ROUND_OUTCOME.Victory);
      const lossRounds = rounds.filter(r => r.resultDto?.id === ROUND_OUTCOME.Loss);
      const tieRounds = rounds.filter(r => r.resultDto?.id === ROUND_OUTCOME.Tie);

      this.currentMatchMetrics = {
        matchId: currentMatch.id,
        victories: victoryRounds.length,
        losses: lossRounds.length,
        ties: tieRounds.length,
        victoryRate: victoryRounds.length / roundsPlayed,
        lossRate: lossRounds.length / roundsPlayed,
        tieRate: tieRounds.length / roundsPlayed,
        roundsPlayed
      }
    }
  }
}
