import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';

import { SharedModule } from '@modules/shared.module';
import { DataScienceRoutingModule } from './data-science-routing.module';
import { DataScienceComponent } from './data-science.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    DataScienceComponent
  ],
  imports: [
    CommonModule,
    DataScienceRoutingModule,
    PlotlyModule,
    SharedModule
  ]
})
export class DataScienceModule { }
