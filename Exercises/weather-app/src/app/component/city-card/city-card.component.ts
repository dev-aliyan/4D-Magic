import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WeatherView } from '../../models/weather.model';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrl: './city-card.component.css'
})
export class CityCardComponent {
  @Input() weather?: WeatherView | null | any;
  @Input() loading = false;
  @Input() errorMsg?: string | null;
  @Output() remove = new EventEmitter<string>();

  removeCity() {
    if (this.weather?.city) this.remove.emit(this.weather.city);
  }

}
