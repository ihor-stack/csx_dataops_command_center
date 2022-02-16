import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePaths } from '@defs/route-paths';

const routes: Routes = [
  {
    path: RoutePaths.CloudMetrics,
    loadChildren: () => import('@modules/cloud-metrics/cloud-metrics.module').then(m => m.CloudMetricsModule)
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
