import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpsgenieAlertsComponent } from './opsgenie-alerts.component';

const routes: Routes = [
  {
    path: '',
    component: OpsgenieAlertsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpsgenieAlertsRoutingModule { }
