import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CommonModule } from '@angular/common';
import { Main } from './component/main/main';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    App,
    Main
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    CommonModule,
    CardModule,
    PaginatorModule,
],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
