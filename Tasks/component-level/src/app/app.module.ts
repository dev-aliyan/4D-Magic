import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoggerComponent } from './components/logger/logger.component';
import { LogServiceService } from './services/log-service.service';

@NgModule({
  declarations: [
    AppComponent,
    LoggerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [LogServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
