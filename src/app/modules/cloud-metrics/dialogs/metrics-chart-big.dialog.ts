import {
  Component, Inject, ViewChild, AfterViewInit
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NsMetric } from '@defs/metrics';

export interface MetricsChartBigData {
  metricName: string;
  metric: NsMetric;
  graphLayout: any;
  graphConfig: any;
}

@Component({
  selector: 'app-big-metrics-chart',
  templateUrl: './metrics-chart-big.dialog.html',
  styleUrls: ['./metrics-chart-big.dialog.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class MetricsChartBigComponent implements AfterViewInit {
  graphLayout: any = {};
  graphData: any;

  @ViewChild('content') content: HTMLElement | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MetricsChartBigData,
  ) { }

  ngAfterViewInit(): void {
    this.graphLayout = { ...this.data.graphLayout };

    if (this.graphLayout.width) delete this.graphLayout.width;
    if (this.graphLayout.height) delete this.graphLayout.height;

    this.graphLayout.autosize = true;
    this.graphLayout.margin.l = 40;

    this.graphData = this.data.metric.graphData;
  }
}
