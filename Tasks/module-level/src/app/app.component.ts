import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuotesListComponent } from "./quotes/quotes-list/quotes-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ QuotesListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'module-level';
}
