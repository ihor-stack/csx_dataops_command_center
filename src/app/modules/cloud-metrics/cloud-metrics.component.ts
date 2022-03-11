import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  switchMap, forkJoin, catchError, of, BehaviorSubject, merge, Subject,
} from 'rxjs';
import {
  distinctUntilChanged, filter, map, tap
} from 'rxjs/operators';

import { AwsService } from '@services/aws.service';
import { LoggerService } from '@services/logger.service';
import { SpinnerService } from '@app/core/services/spinner.service';

import { CloudwatchMetrics } from '@defs/aws-api';
import { NsMetric, Namespace, HiddenMetric } from '@defs/metrics';
import { ViewHiddenMetricsComponent } from './dialogs/view-hidden-metrics.dialog';
import { MetricsChartBigComponent, MetricsChartBigData } from './dialogs/metrics-chart-big.dialog';

const LSK_HIDDEN_METRICS = 'hiddenMetrrics';

interface AwsDimension {
  Name: string;
  Value: string;
}

interface NsDimension {
  metricsNames: string[];
  dimension: AwsDimension;
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

  namespaces: Namespace[] = [];
  displayedNamespace$ = new BehaviorSubject<string>('');
  reload$ = new Subject<boolean>();
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

  nsDimensions: NsDimension[] = [];
  nsDimensionsCtrl = new FormControl(null);

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

        this.displayedNamespace$.next(this.namespaces[1].key);
      }
    );

    merge( // reload metrics if namespace was changed or reload initiated
      this.displayedNamespace$.pipe(
        untilDestroyed(this),
        filter((ns) => ns.length > 0),
        distinctUntilChanged()
      ),
      this.reload$.pipe(
        map(() => this.displayedNamespace$.getValue())
      )
    )
      .pipe(
        switchMap((ns) => {
          this.spinnerService.show(true);

          this.curNsHiddenCount = 0;
          this.nsMetrics = [];

          return this.awsService.listCloudwatchMetrics(ns)
            .pipe(
              catchError((err) => {
                this.loggerService.log('err on get metrics list', err);
                return of([]);
              })
            );
        })
      )
      .subscribe((nsMetric) => { // process namespace metrics
        this.loggerService.log('nsMetric', nsMetric);

        const metricsNames = Object.keys(nsMetric)
          // eslint-disable-next-line arrow-body-style
          .filter((nsm) => {
            if (this.isHidden(nsm)) return false;
            if (nsMetric[nsm].length === 1 && nsMetric[nsm][0].length === 0) {
              this.loggerService.log(`${nsm} skipped: no dimensions`);
              return false;
            }
            return true;
          })
          .sort();

        this.nsDimensions = [];

        metricsNames.forEach((metricName) => {
          const dims: any[] = nsMetric[metricName];

          const dimsOptions: AwsDimension[] = dims
            .flat(Infinity)
            .reduce( // remove duplicates
              (acc1, item: AwsDimension) => {
                // eslint-disable-next-line arrow-body-style
                const tmp = acc1.find((d: AwsDimension) => {
                  return Object.keys(d)
                    .map(() => d.Name === item.Name && d.Value === item.Value) // TODO check it
                    .reduce(
                      (acc2, val) => val && acc2,
                      true
                    );
                });

                if (!tmp) acc1.push(item);

                return acc1;
              },
              [] as AwsDimension[]
            )
            .sort((a: AwsDimension, b: AwsDimension) => {
              let res = 0;
              if (a.Name > b.Name) res = 1;
              if (a.Name < b.Name) res = -1;

              if (!res) {
                if (a.Value > b.Value) res = 1;
                if (a.Value < b.Value) res = -1;
              }

              return res;
            });

          this.loggerService.log('dims', dims);
          this.loggerService.log('dimsOptions', dimsOptions);

          dimsOptions.forEach((dimOpt) => {
            const nsd = this.nsDimensions.find(
              (item) => item.dimension.Name === dimOpt.Name
                && item.dimension.Value === dimOpt.Value
            );

            if (nsd) {
              nsd.metricsNames.push(metricName);
            } else {
              this.nsDimensions.push({
                dimension: dimOpt,
                metricsNames: [metricName]
              });
            }
          });
        });

        this.loggerService.log('nsDimensions', this.nsDimensions);

        this.nsDimensionsCtrl.patchValue(0);
      });

    let loaded = 0;
    this.nsDimensionsCtrl.valueChanges
      .pipe(
        untilDestroyed(this),
        switchMap((dimIdx: number) => {
          loaded = 0;
          this.currentMetricsNames = this.nsDimensions[dimIdx].metricsNames;

          const requests = this.nsDimensions[dimIdx].metricsNames.map(
            // eslint-disable-next-line arrow-body-style
            (metricName) => {
              return this.awsService.fetchCloudwatchMetrics(
                this.displayedNamespace$.getValue(),
                metricName,
                [this.nsDimensions[0].dimension]
              ).pipe(
                catchError((err) => {
                  this.loggerService.log('err on get metrics', err);
                  return of(false);
                }),
                tap(() => {
                  loaded += 1;
                  this.spinnerService.show(
                    `${loaded} of ${this.currentMetricsNames.length} metrics`
                  );
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
          // eslint-disable-next-line arrow-body-style
          this.nsMetrics = this.currentMetricsNames.map((metricName, idx): NsMetric => {
            const item: NsMetric = { name: metricName };

            if (data[idx] !== false) {
              this.loggerService.log(`idx=${idx}`, data[idx]);
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

  switchNs(nsKey: string, event: MouseEvent) {
    this.displayedNamespace$.next(nsKey);
    this.showAllNs = false;

    if (event.target && (event.target as HTMLElement).offsetTop > 0) {
      // if not first line, change order and put clicked item on first place
      for (let i = 0; i < this.namespaces.length; i += 1) {
        if (this.namespaces[i].key === nsKey) this.namespaces[i].order = 1;
        else this.namespaces[i].order += 1;
      }
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

  private addHidden(val: HiddenMetric) {
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
    this.viewHiddenMetricsDialogRef = this.dialog
      .open(
        ViewHiddenMetricsComponent,
        { data: { hidden: this.hiddenMetrics } }
      );

    this.viewHiddenMetricsDialogRef.afterClosed().subscribe((data) => {
      this.hiddenMetrics = [...this.hiddenMetrics].filter(
        (item) => !data.showMetrics.includes(item.metric)
      );

      this.saveHidden();

      this.reload$.next(true);
    });
  }

  showBigChart(nsKey: string) {
    const metric = this.nsMetrics.find((ns) => ns.name === nsKey);
    if (!metric) return;

    this.dialog.open(
      MetricsChartBigComponent,
      {
        data: {
          metricName: nsKey,
          metric,
          graphLayout: this.graphLayout,
          graphConfig: this.graphConfig,
        } as MetricsChartBigData
      }
    );
  }
}
