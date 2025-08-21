import { Component } from '@angular/core';
import { TitleCasePipe, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pipes';
  amount = 1000;
  purchaesOn = new Date();
  company = 'Scripters Labs';
  purchasedOn: Date = new Date();
}
