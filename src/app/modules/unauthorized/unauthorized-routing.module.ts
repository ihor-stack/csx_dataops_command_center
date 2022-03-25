import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnauthorizedRoutePaths } from '@defs/route-paths';
import { UnauthGuard } from '@core/guards/unauth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: UnauthorizedRoutePaths.Login,
    component: LoginComponent,
    canActivate: [UnauthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnauthorizedRoutingModule { }
