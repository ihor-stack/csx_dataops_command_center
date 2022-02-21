import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap, Subject, forkJoin } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { AwsService } from '@services/aws.service';
import { LoggerService } from '@services/logger.service';
import { SpinnerService } from '@services/spinner.service';

interface NsMetric {
  name: string;
  graphData: {
    line: { color: '#3B426E', width: 3 },
    type: 'scatter',
    x: string[],
    y: number[]
  }
}

@UntilDestroy()
@Component({
  selector: 'app-cloud-metrics',
  templateUrl: './cloud-metrics.component.html',
  styleUrls: ['./cloud-metrics.component.scss'],
})
export class CloudMetricsComponent implements OnInit {
  readonly chartFont = 'Nunito';
  readonly chartBg = '#ccceda';
  readonly chartPlotColor = '#3b426e';
  readonly chartFontColor = '#000';
  readonly activeNamespaces = [
    'AmazonMWAA',
    'AmplifyHosting',
    'ApiGateway',
    'Billing',
    'EBS',
    'EC2',
    'EFS',
    'Kafka',
    'Lambda'
  ];

  namespaces: string[] = [];
  displayedNamespace$ = new Subject<string>();
  displayedNamespace: string = '';

  nsMetrics: NsMetric[] = [];
  private currentMetricsNames: string[] = [];
  nsMetricsTail: number[] = [];

  public graphData = {
    line: { color: '#3B426E', width: 3 },
    type: 'scatter',
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
  };

  public graphLayout = {
    /*
    title: {
      text: 'Title',
      font: {
        family: this.chartFont,
        size: 14,
        // color: this.chartFontColor
      },
      xref: 'paper',
      xanchor: 'center',
    },
    */
    width: 300,
    height: 250,
    paper_bgcolor: 'transparent',
    plot_bgcolor: this.chartBg,
    margin: {
      l: 20,
      r: 20,
      b: 50,
      t: 20,
      pad: 0,
    },
    xaxis: {
      tickfont: {
        family: this.chartFont,
        size: 12,
        color: this.chartFontColor,
      },
    },
    yaxis: {
      tickfont: {
        family: this.chartFont,
        size: 12,
        color: this.chartFontColor,
      },
    },
    showlegend: false,
    legend: {
      x: 0,
      y: 1,
      traceorder: 'normal',
      font: {
        family: this.chartFont,
        size: 12,
        color: '#000',
      },
    },
  };

  public graphConfig = {
    displayModeBar: false,
    responsive: true,
  };

  public indicator1 = [{
    domain: {
      x: [0, 1],
      y: [0, 1],
    },
    value: 450,
    title: {
      text: 'Max TaskInstanceFailures',
      color: '#000',
      font: {
        size: 14,
      },
    },
    type: 'indicator',
    mode: 'gauge+number',
    delta: {
      reference: 400,
    },
    gauge: {
      axis: {
        range: [null, 500],
      },
      steps: [{
        range: [0, 250],
        color: 'lightgray',
      }, {
        range: [250, 400],
        color: 'gray',
      }],
      threshold: {
        line: {
          color: 'red',
          width: 4,
        },
        thickness: 0.75,
        value: 490
      }
    }
  }];

  public indicatorsLayout = {
    width: 200,
    height: 170,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    margin: {
      l: 30,
      r: 30,
      b: 20,
      t: 0,
      pad: 0,
    },
    font: {
      family: 'Nunito',
      size: 14,
      color: '#000',
    },
  };

  constructor(
    private awsService: AwsService,
    private loggerService: LoggerService,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.spinnerService.show(true);

    this.awsService.listCloudwatchNamespaces().subscribe(
      (namespaces) => { // process namespaces
        this.namespaces = namespaces.filter(
          // eslint-disable-next-line arrow-body-style
          (name) => {
            return this.activeNamespaces.reduce(
              (acc, item) => name.includes(item) || acc,
              false as boolean
            );
          }
        );
        this.loggerService.log('filtered namespaces', this.namespaces);

        this.displayedNamespace$.next(this.namespaces[1]);
      }
    );

    this.displayedNamespace$
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        switchMap((ns) => {
          this.loggerService.log('active NS', ns);

          this.displayedNamespace = ns;
          this.spinnerService.show(true);

          return this.awsService.listCloudwatchMetrics(ns);
        }),
        switchMap((nsMetric) => { // process namespace metrics
          this.loggerService.log('metric', nsMetric);

          this.currentMetricsNames = Object.keys(nsMetric);
          this.loggerService.log('metricsNames', this.currentMetricsNames);

          const requests = this.currentMetricsNames.map(
            (metricName) => {
              const dims = nsMetric[metricName];

              return this.awsService.fetchCloudwatchMetrics(
                this.displayedNamespace,
                metricName,
                dims[0][1]
              );
            }
          );

          return forkJoin(requests);
        })
      )
      .subscribe({
        next: (data) => {
          this.loggerService.log('data', data);

          // eslint-disable-next-line arrow-body-style
          this.nsMetrics = this.currentMetricsNames.map((metricName, idx): NsMetric => {
            return {
              name: metricName,
              graphData: {
                line: { color: '#3B426E', width: 3 },
                type: 'scatter',
                x: data[idx].MetricDataResults[0].Timestamps.map((ts) => {
                  const parts = ts.split(/[- :+]/);
                  return `${parts[3]}:${parts[4]}`;
                }),
                y: data[idx].MetricDataResults[0].Values
              }
            };
          });

          this.nsMetricsTail = Array(3 - (this.nsMetrics.length % 3)).fill(0);

          this.loggerService.log('nsMetrics', this.nsMetrics);

          this.spinnerService.show(false);
        },
        error: () => { this.spinnerService.show(false); }
      });
  }
}
