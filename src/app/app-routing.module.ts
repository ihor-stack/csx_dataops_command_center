import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePaths } from '@defs/route-paths';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  {
    path: RoutePaths.CloudMetrics,
    loadChildren: () => import('@modules/cloud-metrics/cloud-metrics.module').then(
      (m) => m.CloudMetricsModule
    ),
    canActivate: [AuthGuard],
  },
  {
    path: RoutePaths.DataScience,
    loadChildren: () => import('@modules/data-science/data-science.module').then(
      (m) => m.DataScienceModule
    ),
    canActivate: [AuthGuard]
  },
  {
    path: RoutePaths.OpsgenieAlerts,
    loadChildren: () => import('@modules/opsgenie-alerts/opsgenie-alerts.module').then(
      (m) => m.OpsgenieAlertsModule
    ),
    canActivate: [AuthGuard]
  },
  {
    path: RoutePaths.Unauthorized,
    loadChildren: () => import('@modules/unauthorized/unauthorized.module').then(
      (m) => m.UnauthorizedModule
    )
  },
  {
    path: '**',
    redirectTo: RoutePaths.CloudMetrics,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
