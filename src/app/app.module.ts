import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MaterialCommonModule } from '@modules/mat-common.module';
import { SharedModule } from '@modules/shared.module';

import { AwsService } from '@app/core/services/aws.service';
import { LoggerService } from '@services/logger.service';
import { SpinnerService } from '@app/core/services/spinner.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MaterialCommonModule,
    SharedModule,
  ],
  providers: [
    AwsService,
    LoggerService,
    SpinnerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
