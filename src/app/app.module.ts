import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AwsService } from '@app/core/services/aws.service';
import { LinkPipe } from '@core/pipes/link.pipe';
import { LoggerService } from '@services/logger.service';
import { SpinnerService } from '@services/spinner.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,

    LinkPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    AwsService,
    LoggerService,
    SpinnerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
