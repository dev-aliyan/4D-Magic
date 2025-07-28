import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  getQuotes () {
    return [
      {
        author: "William Shakespeare",
        title: "Hamlet",
        content: "To be, or not to be: that is the question.",
      },
      {
        author: "William Shakespeare",
        title: "The Merchant of Venice",
        content: "All that glitters is not gold.",
      },
      {
        author: "Jane Austen",
        title: "Pride and Prejudice",
        content: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
      },
      {
        author: "J.R.R. Tolkien",
        title: "The Lord of the Rings",
        content: "Not all those who wander are lost.",
      },
      {
        author: "Robert Frost",
        title: "Collected Poems",
        content: "In three words I can sum up everything I've learned about life: it goes on.",
      },
      {
        author: "F. Scott Fitzgerald",
        title: "The Great Gatsby",
        content: "So we beat on, boats against the current, borne back ceaselessly into the past.",
      },
      {
        author: "Charles Dickens",
        title: "A Tale of Two Cities",
        content: "It was the best of times, it was the worst of times.",
      },
      {
        author: "T.S. Eliot",
        title: "The Love Song of J. Alfred Prufrock",
        content: "Do I dare disturb the universe?",
      },
      {
        author: "Nelson Mandela",
        title: "Various Speeches",
        content: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      },
      {
        author: "Steve Jobs",
        title: "Stanford Commencement Speech",
        content: "The only way to do great work is to love what you do.",
      },
    ];
  }
  constructor() { }
}
