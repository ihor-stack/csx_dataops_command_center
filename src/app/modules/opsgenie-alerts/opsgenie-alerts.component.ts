import { Component, OnInit } from '@angular/core';

import {
  /* HorizontalMenuEvent, */ HorizontalMenuItem
} from '@shared/horizontal-menu/horizontal-menu.component';
import { AwsService } from '@services/aws.service';
import { LoggerService } from '@services/logger.service';
import { SettingsStorageService } from '@services/settings-storage.service';
import { SpinnerService } from '@app/core/services/spinner.service';

@Component({
  selector: 'app-opsgenie-alerts',
  templateUrl: './opsgenie-alerts.component.html',
  styleUrls: ['./opsgenie-alerts.component.scss']
})
export class OpsgenieAlertsComponent implements OnInit {
  horMenuItems: HorizontalMenuItem[] = [];
  horMenuActiveItem: string = '';

  dummy = false as boolean;

  constructor(
    private awsService: AwsService,
    private loggerService: LoggerService,
    private settingsStorageService: SettingsStorageService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    this.dummy = true;
  }

  onSelectHorMenuItem(/* data: HorizontalMenuEvent */) {
    this.dummy = true;
  }
}
