import { Injectable } from '@angular/core';

@Injectable()

export class QuoteService {
  private quotes = [
    'Be yourself; everyone else is already taken.',
    'Simplicity is the ultimate sophistication.',
    'Stay hungry, stay foolish.'
  ]

  getQuotes () {
    return this.quotes;
  }

  constructor() { }

}
