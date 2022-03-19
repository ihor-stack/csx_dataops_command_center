import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataScienceComponent } from './data-science.component';

const routes: Routes = [
  {
    path: '',
    component: DataScienceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataScienceRoutingModule { }
