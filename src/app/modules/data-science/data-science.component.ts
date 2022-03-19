import { Component, OnInit } from '@angular/core';
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

import { AwsService } from '@services/aws.service';
import { LoggerService } from '@services/logger.service';
import { SettingsStorageService } from '@services/settings-storage.service';
import { SpinnerService } from '@app/core/services/spinner.service';

import { NameValueItem } from '@defs/common';
import { HorizontalMenuEvent, HorizontalMenuItem } from '@shared/horizontal-menu/horizontal-menu.component';

@UntilDestroy()
@Component({
  selector: 'app-data-science',
  templateUrl: './data-science.component.html',
  styleUrls: ['./data-science.component.scss']
})
export class DataScienceComponent implements OnInit {
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

  mockData = {
    primary: [],
    secondary: []
  };

  displayedItem$ = new BehaviorSubject<string>('');
  reload$ = new Subject<boolean>();
  dummy = '';

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
    private settingsStorageService: SettingsStorageService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    // load data
    this.dummy = '1';
  }

  onSelectHorMenuItem(data: HorizontalMenuEvent) {
    this.displayedItem$.next(data.value);
  }

  onSelectSubItem(val: string) {
    this.dummy = val;
  }
}
