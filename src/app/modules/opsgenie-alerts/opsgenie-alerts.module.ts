import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@modules/shared.module';
import { OpsgenieAlertsComponent } from './opsgenie-alerts.component';
import { OpsgenieAlertsRoutingModule } from './opsgenie-alerts-routing.module';
import { CreateAlertComponent } from './dialogs/create-alert/create-alert.component';

@NgModule({
  declarations: [
    OpsgenieAlertsComponent,
    CreateAlertComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OpsgenieAlertsRoutingModule
  ]
})
export class OpsgenieAlertsModule { }
