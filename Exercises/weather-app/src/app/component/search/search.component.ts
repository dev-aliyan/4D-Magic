import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  query = new FormControl('');
  results$ = this.weatherService.searchResults$;

  constructor(private weatherService: WeatherService) {
    this.query.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        filter((val): val is string => !!val && val.trim().length > 0)
      )
      .subscribe((val) => this.weatherService.searchCity(val));
  }

  selectCity(city: string) {
    this.query.setValue(city);
    this.weatherService.getWeather(city);
    this.weatherService.searchCity(''); // clear dropdown
  }
}
