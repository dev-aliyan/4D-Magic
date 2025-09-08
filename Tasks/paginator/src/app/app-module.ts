import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataView } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CommonModule } from '@angular/common';
import { Main } from './component/main/main';
import { Paginator } from 'primeng/paginator';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    App,
    Main
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataView,
    ButtonModule,
    Tag,
    CommonModule,
    Paginator,
    CardModule
],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
