import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  query = new FormControl('');
  results: string[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.query.valueChanges.pipe(
      debounceTime(400), // wait until user stops typing
      distinctUntilChanged(), // ignore same queries
      filter((q): q is string => !!q && q.length >= 3), // ✅ null-safe
      switchMap(q => this.searchService.search(q)) // cancel previous request if new one arrives
    ).subscribe(res => {
      this.results = res;
    });
  }
}
