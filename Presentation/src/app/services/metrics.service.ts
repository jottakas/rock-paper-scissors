import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ServiceActions } from './service-actions';

@Injectable({
  providedIn: 'root'
})
export class MetricsService extends HttpService {
  protected override readonly apiUrl = 'metrics';

  /**
   * Gets the hand shapes
   * @returns Correlation id
   */
  public getMatches(): string {
    return super.get({ endpoint: 'matches', action: ServiceActions.Metrics.GET_MATCHES });
  }
}
