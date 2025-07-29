import { QuotesService } from './../../services/quotes.service';
import { Component, OnInit } from '@angular/core';
import { Quotes } from '../../Quote';

@Component({
  selector: 'app-quotes-main',
  templateUrl: './quotes-main.component.html',
  styleUrl: './quotes-main.component.css'
})

export class QuotesMainComponent implements OnInit {
  quotes : Quotes [] = [];

  constructor (private QuotesService : QuotesService ) {}

  ngOnInit(): void {
    this.quotes = this.QuotesService.getQuotes()
  }
  
}
