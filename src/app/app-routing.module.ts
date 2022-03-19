import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePaths } from '@defs/route-paths';

const routes: Routes = [
  {
    path: RoutePaths.CloudMetrics,
    loadChildren: () => import('@modules/cloud-metrics/cloud-metrics.module').then(
      (m) => m.CloudMetricsModule
    )
  },
  {
    path: RoutePaths.DataScience,
    loadChildren: () => import('@modules/data-science/data-science.module').then(
      (m) => m.DataScienceModule
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
