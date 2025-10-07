import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
})
export class WeatherCardComponent {
  weather$: Observable<any> = this.weatherService.weatherState$;
  isCelsius = true;

  constructor(private weatherService: WeatherService) {}

  toggleUnit() {
    this.isCelsius = !this.isCelsius;
  }

  convertTemp(tempC: number): number {
    return this.isCelsius ? tempC : (tempC * 9) / 5 + 32;
  }
}
