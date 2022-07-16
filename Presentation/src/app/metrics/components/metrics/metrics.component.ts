import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Subscription } from 'rxjs';
import { GameService } from '../../../services/game.service';
import { MetricsService } from '../../../services/metrics.service';
import { DD_FIGHT_ROUND_RESULT } from '../../../shared/enums/dd-fight-round-result.enum';
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

  public matchMetrics: MatchMetrics = this.initMatchMetrics();

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

    this.matchMetrics = this.initMatchMetrics();

    if (roundsPlayed > 0) {
      const victoryRounds = rounds.filter(r => r.resultDto?.id === DD_FIGHT_ROUND_RESULT.Victory);
      const lossRounds = rounds.filter(r => r.resultDto?.id === DD_FIGHT_ROUND_RESULT.Loss);
      const tieRounds = rounds.filter(r => r.resultDto?.id === DD_FIGHT_ROUND_RESULT.Tie);

      this.matchMetrics = {
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
