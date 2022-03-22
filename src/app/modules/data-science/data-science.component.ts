import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy,
  QueryList, ViewChild, ViewChildren
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  BehaviorSubject, Subject,
  // switchMap, forkJoin, catchError, of, merge,
} from 'rxjs';
/*
import {
  distinctUntilChanged, filter, map, tap
} from 'rxjs/operators';
*/

import {
  defGaugeChartConfig, defGaugeChartLayout, defLineChartConfig, defLineChartLayout
} from '@defs/chart-configs';
import { Clone } from '@utils/clone-deep';
import { NameValueItem, SimpleObject } from '@defs/common';
import { getTail3Count } from '@utils/fns';

import { AwsService } from '@services/aws.service';
import { LoggerService } from '@services/logger.service';
import { SettingsStorageService } from '@services/settings-storage.service';
import { SpinnerService } from '@app/core/services/spinner.service';

import { HorizontalMenuEvent, HorizontalMenuItem } from '@shared/horizontal-menu/horizontal-menu.component';

@UntilDestroy()
@Component({
  selector: 'app-data-science',
  templateUrl: './data-science.component.html',
  styleUrls: ['./data-science.component.scss']
})
export class DataScienceComponent implements AfterViewInit, OnDestroy {
  readonly primaryLinechartId = 'primaryLineChart';
  readonly secondaryLinechartIdPrefix = 'secondaryLinechart_';
  readonly secondaryLinechartsId = 'secondaryLinecharts';

  horMenuItems: HorizontalMenuItem[] = [
    {
      name: 'item1',
      value: 'item1',
      order: 0
    },
    {
      name: 'item2',
      value: 'item2',
      order: 0
    }
  ];

  sideMenuItems: NameValueItem[] = [
    {
      name: 'subitem1',
      value: 'subitem1'
    },
    {
      name: 'subitem2',
      value: 'subitem2',
    }
  ];

  mockData: any = {};

  displayedItem$ = new BehaviorSubject<string>('');
  reload$ = new Subject<boolean>();
  dummy = '';

  primaryLineChartLayout: SimpleObject;
  secondaryLineChartLayout: SimpleObject;
  lineChartConfig: SimpleObject;
  gaugeLayout: SimpleObject;
  gaugeConfig: SimpleObject[];

  private resizeObserver: ResizeObserver;

  @ViewChild('primaryLineChart') primaryLineChart: ElementRef | undefined;
  @ViewChildren('secondaryChart') secondaryLineCharts: QueryList<ElementRef> | undefined;

  constructor(
    private awsService: AwsService,
    private loggerService: LoggerService,
    private settingsStorageService: SettingsStorageService,
    private spinnerService: SpinnerService,
    private cdRef: ChangeDetectorRef
  ) {
    this.primaryLineChartLayout = Clone.deepCopy(defLineChartLayout);
    this.secondaryLineChartLayout = Clone.deepCopy(defLineChartLayout);

    this.lineChartConfig = Clone.deepCopy(defLineChartConfig);
    // console.log('lineChartConfig', this.lineChartConfig);

    this.gaugeLayout = Clone.deepCopy(defGaugeChartLayout);
    this.gaugeConfig = Clone.deepCopy(defGaugeChartConfig);
    this.resizeObserver = new ResizeObserver((entries) => {
      let secondaryW = 0;
      let secondaryH = 0;

      entries.forEach((entry) => {
        if (entry.target.id === this.primaryLinechartId) {
          this.primaryLineChartLayout['width'] = entry.contentRect.width;
          this.primaryLineChartLayout['height'] = entry.contentRect.height;
        }

        if (entry.target.id.indexOf(this.secondaryLinechartIdPrefix) === 0) {
          secondaryW = entry.contentRect.width;
          secondaryH = entry.contentRect.height;
        }
      });

      if (secondaryW > 0 && secondaryH > 0) {
        this.secondaryLineChartLayout['width'] = secondaryW;
        this.secondaryLineChartLayout['height'] = secondaryH;
      }

      this.cdRef.detectChanges();
    });
  }

  ngAfterViewInit(): void {
    // load data
    this.awsService.getDataScienceMockData().subscribe((data) => {
      this.mockData = data;
    });

    if (this.primaryLineChart) {
      this.resizeObserver.observe(this.primaryLineChart.nativeElement);
    }

    if (this.secondaryLineCharts) {
      this.secondaryLineCharts.changes
        .pipe(untilDestroyed(this))
        .subscribe((data: QueryList<ElementRef>) => {
          data.forEach((ref: ElementRef) => {
            this.resizeObserver.observe(ref.nativeElement);
          });
        });
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  onSelectHorMenuItem(data: HorizontalMenuEvent) {
    this.displayedItem$.next(data.value);
  }

  onSelectSubItem(val: string) {
    this.dummy = val;
  }

  getTailCount() {
    if (!Array.isArray(this.mockData.secondary)) return [];
    return getTail3Count(this.mockData.secondary.length);
  }
}
