import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MetricsComponent } from './components/metrics/metrics.component';

@NgModule({
  declarations: [
    MetricsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MetricsComponent
  ]
})
export class MetricsModule { }
