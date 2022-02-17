import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AwsService } from '@app/core/services/aws.service';
import { LinkPipe } from '@core/pipes/link.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,

    LinkPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    AwsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
