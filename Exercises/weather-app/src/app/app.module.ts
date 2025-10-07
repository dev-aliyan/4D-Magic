import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './component/main/main.component';
import { SearchComponent } from './component/search/search.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WeatherCardComponent } from './component/weather-card/weather-card.component';
import { WeatherDashboardComponent } from './component/weather-dashboard/weather-dashboard.component'; 


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SearchComponent,
    WeatherCardComponent,
    WeatherDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
