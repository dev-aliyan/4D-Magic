import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../quote.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quotes-list',
  standalone: true,
  imports: [CommonModule],
  providers: [QuoteService],
  templateUrl: './quotes-list.component.html',
  styleUrl: './quotes-list.component.css'
})
export class QuotesListComponent implements OnInit {
  constructor (private quoteService : QuoteService) {}

  quotes : string [] = [];

  ngOnInit(): void {
    this.quotes = this.quoteService.getQuotes();
  }
}
