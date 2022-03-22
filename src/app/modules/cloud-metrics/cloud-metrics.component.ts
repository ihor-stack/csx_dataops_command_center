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
import { SettingsStorageService } from '@services/settings-storage.service';
import { SpinnerService } from '@app/core/services/spinner.service';

import { HorizontalMenuEvent, HorizontalMenuItem } from '@shared/horizontal-menu/horizontal-menu.component';
import { CloudwatchMetrics } from '@defs/aws-api';
import {
  HiddenMetric, NamespaceConfig, NsMetric
} from '@defs/metrics';
import {
  defGaugeChartConfig, defGaugeChartLayout, defLineChartConfig, defLineChartLayout
} from '@defs/chart-configs';
import { Clone } from '@utils/clone-deep';
import { SimpleObject } from '@defs/common';
import { getTail3Count } from '@utils/fns';

import { ViewHiddenMetricsComponent } from './dialogs/view-hidden-metrics.dialog';
import { MetricsChartBigComponent, MetricsChartBigData } from './dialogs/metrics-chart-big.dialog';

interface AwsDimension {
  Name: string;
  Value: string;
}

interface NsDimension {
  metricsNames: string[];
  hiddenMetricsNames: string[];
  dimension: AwsDimension;
}

@UntilDestroy()
@Component({
  selector: 'app-cloud-metrics',
  templateUrl: './cloud-metrics.component.html',
  styleUrls: ['./cloud-metrics.component.scss'],
})
export class CloudMetricsComponent implements OnInit {
  namespaces: HorizontalMenuItem[] = [];
  displayedNamespace$ = new BehaviorSubject<string>('');
  reload$ = new Subject<boolean>();

  // list of all metrics in namespace
  nsMetrics: NsMetric[] = [];
  // private currentMetricsNames: string[] = [];

  // list of all hidden metrics
  hiddenMetrics: HiddenMetric[] = [];

  viewHiddenMetricsDialogRef: MatDialogRef<ViewHiddenMetricsComponent> | undefined;

  nsDimensions: NsDimension[] = [];
  nsDimensionsCtrl = new FormControl(null);
  activeDimensionIdx: number = -1;

  lineChartLayout: SimpleObject;
  lineChartConfig: SimpleObject;
  gaugeLayout: SimpleObject;
  gaugeConfig: SimpleObject[];

  constructor(
    private awsService: AwsService,
    private loggerService: LoggerService,
    private settingsStorageService: SettingsStorageService,
    private spinnerService: SpinnerService,
    public dialog: MatDialog,
  ) {
    this.lineChartLayout = Clone.deepCopy(defLineChartLayout);
    this.lineChartLayout['width'] = 300;
    this.lineChartLayout['height'] = 250;

    this.lineChartConfig = Clone.deepCopy(defLineChartConfig);
    this.gaugeLayout = Clone.deepCopy(defGaugeChartLayout);
    this.gaugeConfig = Clone.deepCopy(defGaugeChartConfig);
  }

  ngOnInit(): void {
    this.loadHidden();
    const metricsMenuConfigs = this.settingsStorageService.getNamespaceMenuConfig();
    let activeNamespace = this.settingsStorageService.getActiveNamespace();

    this.spinnerService.show(true);

    this.awsService.listCloudwatchNamespaces().subscribe(
      (namespaces) => { // process namespaces
        this.namespaces = namespaces.map(
          (key) => {
            const conf = metricsMenuConfigs.find((mmc) => mmc.key === key);

            return {
              value: key,
              name: key.replace('AWS/', ''),
              order: conf ? conf.order : 1
            };
          }
        );

        if (!activeNamespace) activeNamespace = this.namespaces[0].value;
        this.displayedNamespace$.next(activeNamespace);
      }
    );

    merge( // reload metrics if namespace was changed or reload initiated
      this.displayedNamespace$.pipe(
        untilDestroyed(this),
        filter((ns) => ns.length > 0),
        distinctUntilChanged(),
        tap(() => {
          this.activeDimensionIdx = -1;
        })
      ),
      this.reload$.pipe(
        map(() => this.displayedNamespace$.getValue())
      )
    )
      .pipe(
        switchMap((ns) => {
          this.spinnerService.show(true);
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
        const metricsNames = Object.keys(nsMetric)
          // eslint-disable-next-line arrow-body-style
          .filter((nsm) => {
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

          dimsOptions.forEach((dimOpt) => {
            const nsd = this.nsDimensions.find(
              (item) => item.dimension.Name === dimOpt.Name
                && item.dimension.Value === dimOpt.Value
            );

            if (nsd) {
              if (this.isHidden(metricName)) nsd.hiddenMetricsNames.push(metricName);
              else nsd.metricsNames.push(metricName);
            } else {
              const isHidden = this.isHidden(metricName);

              this.nsDimensions.push({
                dimension: dimOpt,
                metricsNames: !isHidden ? [metricName] : [],
                hiddenMetricsNames: isHidden ? [metricName] : []
              });
            }
          });
        });

        if (this.activeDimensionIdx < 0 || this.activeDimensionIdx >= this.nsDimensions.length) {
          this.activeDimensionIdx = 0;
        }

        this.nsDimensionsCtrl.patchValue(this.activeDimensionIdx);
      });

    let loaded = 0;
    this.nsDimensionsCtrl.valueChanges
      .pipe(
        untilDestroyed(this),
        switchMap((dimIdx: number) => {
          this.activeDimensionIdx = dimIdx;
          loaded = 0;
          // this.currentMetricsNames = this.nsDimensions[this.activeDimensionIdx].metricsNames;

          const requests = this.nsDimensions[this.activeDimensionIdx].metricsNames.map(
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
                    `${loaded} of ${this.nsDimensions[this.activeDimensionIdx].metricsNames.length} metrics`
                  );
                })
              );
            }
          );

          this.spinnerService.show(
            `${loaded} of ${this.nsDimensions[this.activeDimensionIdx].metricsNames.length} metrics`
          );
          return forkJoin(requests);
        })
      )
      .subscribe({
        next: (data) => {
          // eslint-disable-next-line arrow-body-style
          this.nsMetrics = this.nsDimensions[this.activeDimensionIdx].metricsNames.map(
            (metricName, idx): NsMetric => {
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
            }
          );

          this.spinnerService.show(false);
        },
        error: () => {
          // show notification
          this.spinnerService.show(false);
        }
      });
  }

  getTailCount() {
    return getTail3Count(this.nsMetrics.length);
  }

  onSelectHorMenuItem(data: HorizontalMenuEvent) {
    this.displayedNamespace$.next(data.value);
    this.settingsStorageService.setActiveNamespace(data.value);

    if (data.event.target && (data.event.target as HTMLElement).offsetTop > 0) {
      // if not first line, change order and put clicked item on first place
      for (let i = 0; i < this.namespaces.length; i += 1) {
        if (this.namespaces[i].value === data.value) this.namespaces[i].order = 1;
        else this.namespaces[i].order += 1;

        // eslint-disable-next-line arrow-body-style
        const nsConfigs = this.namespaces.map((ns): NamespaceConfig => {
          return {
            key: ns.value,
            order: ns.order
          };
        });

        this.settingsStorageService.saveNamespaceMenuConfig(nsConfigs);
      }
    }
  }

  hideMetrics(metric: string) {
    this.hiddenMetrics.push({
      namespace: this.displayedNamespace$.getValue(),
      metric
    });
    this.saveHidden();

    this.reload$.next(true);
  }

  loadHidden() {
    this.hiddenMetrics = this.settingsStorageService.getHiddenMetrics();
  }

  private saveHidden() {
    this.settingsStorageService.saveHiddenMetrics(this.hiddenMetrics);
  }

  isHidden(ns: string): boolean {
    const curNs = this.displayedNamespace$.getValue();

    return !!this.hiddenMetrics.find(
      (hidden) => hidden.namespace === curNs && hidden.metric === ns
    );
  }

  showHiddenMetricsDialod() {
    const hidden = this.hiddenMetrics.filter(
      (hm) => this.nsDimensions[this.activeDimensionIdx].hiddenMetricsNames.includes(hm.metric)
    );

    this.viewHiddenMetricsDialogRef = this.dialog
      .open(
        ViewHiddenMetricsComponent,
        { data: { hidden } }
      );

    this.viewHiddenMetricsDialogRef.afterClosed().subscribe((data) => {
      if (data === '') return;
      this.loggerService.log('data from dialog', data);

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
          lineChartLayout: this.lineChartLayout,
          lineChartConfig: this.lineChartConfig,
        } as MetricsChartBigData
      }
    );
  }
}
