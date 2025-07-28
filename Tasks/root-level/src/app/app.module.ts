import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { QuotesHeaderComponent } from './components/quotes-header/quotes-header.component';
import { QuotesMainComponent } from './components/quotes-main/quotes-main.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    QuotesHeaderComponent,
    QuotesMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
