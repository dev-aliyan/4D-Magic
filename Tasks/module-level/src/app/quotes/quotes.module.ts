import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotesListComponent } from './quotes-list/quotes-list.component';
import { QuoteService } from './quote.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, QuotesListComponent
  ],
  providers : [QuoteService]
})
export class QuotesModule { }
