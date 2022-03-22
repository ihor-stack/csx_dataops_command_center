import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UntilDestroy, /* untilDestroyed */ } from '@ngneat/until-destroy';
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
export class DataScienceComponent implements OnInit, AfterViewInit {
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

  lineChartLayout: SimpleObject;
  lineChartConfig: SimpleObject;
  gaugeLayout: SimpleObject;
  gaugeConfig: SimpleObject[];

  constructor(
    private awsService: AwsService,
    private loggerService: LoggerService,
    private settingsStorageService: SettingsStorageService,
    private spinnerService: SpinnerService,
  ) {
    this.lineChartLayout = Clone.deepCopy(defLineChartLayout);
    // console.log('lineChartLayout', this.lineChartLayout);

    this.lineChartConfig = Clone.deepCopy(defLineChartConfig);
    // console.log('lineChartConfig', this.lineChartConfig);

    this.gaugeLayout = Clone.deepCopy(defGaugeChartLayout);
    this.gaugeConfig = Clone.deepCopy(defGaugeChartConfig);
  }

  ngOnInit(): void {
    this.dummy = '1';
    // load data
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.mockData = {
        primary: {
          line: { color: '#3B426E', width: 3 },
          type: 'scatter',
          x: [0, 1, 2, 3],
          y: [2, 3, 4, 5]
        },
        secondary: [
          {
            graphData: {
              line: { color: '#3B426E', width: 3 },
              type: 'scatter',
              x: [0, 1, 2, 3],
              y: [2, 3, 4, 5]
            }
          },
          /*
          {
            graphData: {
              line: { color: '#3B426E', width: 3 },
              type: 'scatter',
              x: [0, 1, 2, 3],
              y: [2, 3, 4, 5]
            }
          },
          {
            graphData: {
              line: { color: '#3B426E', width: 3 },
              type: 'scatter',
              x: [0, 1, 2, 3],
              y: [2, 3, 4, 5]
            }
          },
          */
        ]
      };
    }, 50);
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
