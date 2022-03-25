import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UnauthorizedRoutingModule } from './unauthorized-routing.module';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UnauthorizedRoutingModule
  ]
})
export class UnauthorizedModule { }
