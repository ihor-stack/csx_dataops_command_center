import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '@modules/shared.module';

import { AwsService } from '@services/aws.service';
import { CommonService } from '@services/common.service';
import { LoggerService } from '@services/logger.service';
import { SettingsStorageService } from '@services/settings-storage.service';
import { SpinnerService } from '@services/spinner.service';

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
    SharedModule,
  ],
  providers: [
    AwsService,
    CommonService,
    LoggerService,
    SettingsStorageService,
    SpinnerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
