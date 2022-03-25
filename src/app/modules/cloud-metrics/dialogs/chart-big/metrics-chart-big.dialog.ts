import {
  Component, Inject, ViewChild, AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NsMetric } from '@defs/metrics';
import { Clone } from '@utils/clone-deep';

export interface MetricsChartBigData {
  metricName: string;
  metric: NsMetric;
  lineChartLayout: any;
  lineChartConfig: any;
}

@Component({
  selector: 'app-big-metrics-chart',
  templateUrl: './metrics-chart-big.dialog.html',
  styleUrls: ['./metrics-chart-big.dialog.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class MetricsChartBigComponent implements AfterViewInit {
  lineChartLayout: any = {};
  graphData: any;

  @ViewChild('content') content: HTMLElement | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MetricsChartBigData,
    private cdRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.lineChartLayout = Clone.deepCopy(this.data.lineChartLayout);

    this.lineChartLayout.autosize = true;
    this.lineChartLayout.margin.l = 40;

    this.graphData = this.data.metric.graphData;
    this.cdRef.detectChanges();
  }
}
