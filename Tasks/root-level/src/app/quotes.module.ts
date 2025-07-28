// src/app/quotes.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteHeaderComponent } from './components/qoute-header/qoute-header.component';
import { QuoteMainComponent } from './components/qoute-main/qoute-main.component';
import { QuotesService } from './services/qoutes.service';

@NgModule({
  declarations: [
    QuoteHeaderComponent,
    QuoteMainComponent
  ],
  imports: [CommonModule],
  exports: [
    QuoteHeaderComponent,
    QuoteMainComponent
  ],
  providers: [QuotesService]
})
export class QuotesModule { }  