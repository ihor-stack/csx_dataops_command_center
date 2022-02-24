import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  switchMap, forkJoin, catchError, of, BehaviorSubject,
} from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';

import { AwsService } from '@services/aws.service';
import { LoggerService } from '@services/logger.service';
import { SpinnerService } from '@app/core/services/spinner.service';

import { CloudwatchMetrics } from '@defs/aws-api';
import { NsMetric, Namespace, HiddenMetric } from '@defs/metrics';
import { ViewHiddenMetricsComponent } from './dialogs/view-hidden-metrics.dialog';

const LSK_HIDDEN_METRICS = 'hiddenMetrrics';

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

  namespaces: Namespace[] = [];
  displayedNamespace$ = new BehaviorSubject<string>('');
  showAllNs = false;

  nsMetrics: NsMetric[] = [];
  private currentMetricsNames: string[] = [];

  hiddenMetrics: HiddenMetric[] = [];
  curNsHiddenCount = 0;

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
      l: 30,
      r: 10,
      b: 50,
      t: 10,
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

  viewHiddenMetricsDialogRef: MatDialogRef<ViewHiddenMetricsComponent> | undefined;

  dummy = '';

  constructor(
    private awsService: AwsService,
    private loggerService: LoggerService,
    private spinnerService: SpinnerService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadHidden();

    this.spinnerService.show(true);

    this.awsService.listCloudwatchNamespaces().subscribe(
      (namespaces) => { // process namespaces
        this.namespaces = namespaces.map(
          // eslint-disable-next-line arrow-body-style
          (key) => {
            return {
              key,
              displayName: key.replace('AWS/', ''),
              order: 1
            };
          }
        );
        this.loggerService.log('filtered namespaces', this.namespaces);

        this.displayedNamespace$.next(this.namespaces[1].key);
      }
    );

    this.displayedNamespace$
      .pipe(
        tap((val) => this.loggerService.log('sel ns', val)),
        untilDestroyed(this),
        distinctUntilChanged(),
        switchMap((ns) => {
          this.loggerService.log('active NS', ns);
          this.spinnerService.show(true);

          return this.awsService.listCloudwatchMetrics(ns)
            .pipe(
              catchError((err) => {
                this.loggerService.log('err on get metrics list', err);
                return of([]);
              })
            );
        }),
        switchMap((nsMetric) => { // process namespace metrics
          this.loggerService.log('metric', nsMetric);

          this.currentMetricsNames = Object.keys(nsMetric)
            .filter((nsm) => !this.isHidden(nsm))
            .sort();

          this.loggerService.log('metricsNames', this.currentMetricsNames);

          let loaded = 0;

          const requests = this.currentMetricsNames.map(
            (metricName) => {
              const dims = nsMetric[metricName];

              return this.awsService.fetchCloudwatchMetrics(
                this.displayedNamespace$.getValue(),
                metricName,
                dims[0][1]
              ).pipe(
                catchError((err) => {
                  this.loggerService.log('err on get metrics', err);
                  return of(false);
                }),
                tap(() => {
                  loaded += 1;
                  this.spinnerService.show(`${loaded} of ${this.currentMetricsNames.length} metrics`);
                })
              );
            }
          );

          this.spinnerService.show(`${loaded} of ${this.currentMetricsNames.length} metrics`);
          return forkJoin(requests);
        })
      )
      .subscribe({
        next: (data) => {
          this.loggerService.log('data', data);

          // eslint-disable-next-line arrow-body-style
          this.nsMetrics = this.currentMetricsNames.map((metricName, idx): NsMetric => {
            const item: NsMetric = { name: metricName };

            if (data[idx] !== false) {
              const results = (data[idx] as CloudwatchMetrics).MetricDataResults[0];
              item.graphData = {
                line: { color: '#3B426E', width: 3 },
                type: 'scatter',
                x: results.Timestamps.map((ts) => {
                  const parts = ts.split(/[- :+]/);
                  return `${parts[3]}:${parts[4]}`;
                }),
                y: results.Values
              };
            }

            return item;
          });

          this.loggerService.log('nsMetrics', this.nsMetrics);

          this.calcHidden();

          this.spinnerService.show(false);
        },
        error: () => {
          // show notification
          this.spinnerService.show(false);
        }
      });
  }

  getTailCount() {
    const tmp = this.nsMetrics.length % 3;
    return tmp ? Array(3 - tmp).fill(0) : [];
  }

  switchNs(nsKey: string) {
    this.displayedNamespace$.next(nsKey);
    this.showAllNs = false;

    for (let i = 0; i < this.namespaces.length; i += 1) {
      if (this.namespaces[i].key === nsKey) this.namespaces[i].order = 1;
      else this.namespaces[i].order += 1;
    }
  }

  hideMetrics(nsKey: string) {
    this.addHidden({
      namespace: this.displayedNamespace$.getValue(),
      metric: nsKey
    });

    this.nsMetrics = this.nsMetrics.filter((nsm) => nsm.name !== nsKey);
  }

  loadHidden() {
    try {
      const strData = localStorage.getItem(LSK_HIDDEN_METRICS);
      if (strData) {
        this.hiddenMetrics = JSON.parse(strData);
        this.calcHidden();
        this.loggerService.log('hiddens', this.hiddenMetrics);
      }
    } catch (err) {
      //
    }
  }

  private saveHidden() {
    localStorage.setItem(
      LSK_HIDDEN_METRICS,
      JSON.stringify(this.hiddenMetrics)
    );
  }

  addHidden(val: HiddenMetric) {
    this.hiddenMetrics.push(val);
    this.calcHidden();
    this.saveHidden();
  }

  calcHidden() {
    const curNs = this.displayedNamespace$.getValue();

    this.curNsHiddenCount = this.hiddenMetrics.reduce(
      (acc, item) => {
        if (item.namespace === curNs) return (acc + 1);
        return acc;
      },
      0
    );
  }

  isHidden(ns: string): boolean {
    const curNs = this.displayedNamespace$.getValue();

    return !!this.hiddenMetrics.find(
      (hidden) => hidden.namespace === curNs && hidden.metric === ns
    );
  }

  showHiddenMetricsDialod() {
    this.viewHiddenMetricsDialogRef = this.dialog.open(ViewHiddenMetricsComponent);
  }

  showBigChart(nsKey: string) {
    // console.log('show big', nsKey);
    this.dummy = nsKey;
  }
}
