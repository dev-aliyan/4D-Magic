import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { WeatherResponse, WeatherView } from '../models/weather.model';
import { environment } from '../../enviroments/enviroment';


@Injectable({ providedIn: 'root' })
export class WeatherService {
  private base = 'https://api.openweathermap.org/data/2.5/weather';


  constructor(private http: HttpClient) { }


  getWeatherByCity(city: string, units: 'metric' | 'imperial' = 'metric'): Observable<WeatherView | { error: true; message: string }> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', environment.openWeatherApiKey)
      .set('units', units);


    return this.http.get<WeatherResponse>(this.base, { params }).pipe(
    map(res => this.toView(res)),
      catchError(err => of({ error: true as const, message: String(err?.error?.message || 'Failed to fetch weather') })),
      shareReplay(1)
    );
  }


  private toView(res: WeatherResponse): WeatherView {
    const icon = res.weather[0]?.icon;
    return {
      city: res.name,
      country: res.sys.country,
      temp: res.main.temp,
      description: res.weather[0].description,
      iconUrl: `https://openweathermap.org/img/wn/${icon}@2x.png`,
      humidity: res.main.humidity,
      wind: res.wind.speed
    };
  }
}