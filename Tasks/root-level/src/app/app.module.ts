import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { QouteHeaderComponent } from './components/qoute-header/qoute-header.component';
import { QouteMainComponent } from './components/qoute-main/qoute-main.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    QouteHeaderComponent,
    QouteMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
