import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = environment.openWeatherApiKey;
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private searchUrl = 'https://api.openweathermap.org/data/2.5/find';

  private weatherState = new BehaviorSubject<any>(null);
  weatherState$ = this.weatherState.asObservable();

  private searchResults = new BehaviorSubject<any[]>([]);
  searchResults$ = this.searchResults.asObservable();

  private loadingState = new BehaviorSubject<boolean>(false);
  loadingState$ = this.loadingState.asObservable();

  private errorState = new BehaviorSubject<string | null>(null);
  errorState$ = this.errorState.asObservable();

  constructor(private http: HttpClient) {}

  // City search (auto-suggest)
  searchCity(query: string) {
    if (!query.trim()) {
      this.searchResults.next([]);
      return;
    }

    this.http
      .get<any>(`${this.searchUrl}?q=${query}&appid=${this.apiKey}&units=metric`)
      .pipe(
        catchError(() => of([])),
        tap((res) => this.searchResults.next(res.list || []))
      )
      .subscribe();
  }

  // Fetch Weather & Cache
  getWeather(city: string) {
    const currentWeather = this.weatherState.getValue();
    if (currentWeather && currentWeather.name === city) {
      return; // already cached
    }

    this.loadingState.next(true);
    this.errorState.next(null);

    this.http
      .get<any>(`${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric`)
      .pipe(
        catchError((err) => {
          this.errorState.next('City not found.');
          this.loadingState.next(false);
          return of(null);
        }),
        tap((res) => {
          if (res) {
            this.weatherState.next(res);
            this.loadingState.next(false);
          }
        })
      )
      .subscribe();
  }
}




//   getWeatherByCity(city: string, units: 'metric' | 'imperial' = 'metric'): Observable<WeatherView | { error: true; message: string }> {
//     const params = new HttpParams()
//       .set('q', city)
//       .set('appid', environment.openWeatherApiKey)
//       .set('units', units);


//     return this.http.get<WeatherResponse>(this.baseUrl, { params }).pipe(
//     map(res => this.toView(res)),
//       catchError(err => of({ error: true as const, message: String(err?.error?.message || 'Failed to fetch weather') })),
//       shareReplay(1)
//     );
//   }


//   private toView(res: WeatherResponse): WeatherView {
//     const icon = res.weather[0]?.icon;
//     return {
//       city: res.name,
//       country: res.sys.country,
//       temp: res.main.temp,
//       description: res.weather[0].description,
//       iconUrl: `https://openweathermap.org/img/wn/${icon}@2x.png`,
//       humidity: res.main.humidity,
//       wind: res.wind.speed
//     };
//   }
// }