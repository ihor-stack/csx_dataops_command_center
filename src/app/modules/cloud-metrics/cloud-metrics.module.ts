import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';

import { CloudMetricsRoutingModule } from './cloud-metrics-routing.module';
import { CloudMetricsComponent } from './cloud-metrics.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    CloudMetricsComponent,
  ],
  imports: [
    CommonModule,
    CloudMetricsRoutingModule,
    PlotlyModule,
  ],
})
export class CloudMetricsModule { }
