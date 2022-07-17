import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MetricsComponent } from './components/metrics/metrics.component';
import { MatchesChartComponent } from './components/matches-chart/matches-chart.component';

@NgModule({
  declarations: [
    MetricsComponent,
    MatchesChartComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MetricsComponent,
    MatchesChartComponent
  ]
})
export class MetricsModule { }
