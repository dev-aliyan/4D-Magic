import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherView } from '../../models/weather.model';
import { BehaviorSubject, catchError, interval, of, startWith, Subscription, switchMap, tap } from 'rxjs';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  // list of cities to show
  private citiesSubject = new BehaviorSubject<string[]>(['Karachi']);
  cities$ = this.citiesSubject.asObservable();

  // map city -> { loading, data, error }
  cityStates: Record<string, { loading: boolean; data?: WeatherView | null; error?: string | null }> = {};

  // units
  units: 'metric' | 'imperial' = 'metric';

  // auto refresh every 5 minutes (300000 ms)
  private refreshMs = 300000;
  private subs = new Subscription();

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    // subscribe to city list changes and fetch
    const s = this.cities$.pipe(
      switchMap(cities => {
        // initialize states
        cities.forEach(c => this.cityStates[c] = { loading: true, data: null, error: null });
        // for each city fetch once, then set up auto refresh
        return of(cities);
      })
    ).subscribe(cities => this.fetchAll(cities));

    this.subs.add(s);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  addCity(city: string) {
    const trimmed = city.trim();
    if (!trimmed) return;
    const current = this.citiesSubject.getValue();
    if (current.includes(trimmed)) return;
    this.citiesSubject.next([...current, trimmed]);
  }

  removeCity(city: string) {
    const current = this.citiesSubject.getValue().filter(c => c !== city);
    delete this.cityStates[city];
    this.citiesSubject.next(current);
  }

  setUnits(u: 'metric' | 'imperial') {
    this.units = u;
    // re-fetch all
    this.fetchAll(this.citiesSubject.getValue());
  }

  private fetchAll(cities: string[]) {
    // clear existing subscriptions for refresh
    this.subs.unsubscribe()
    this.subs = new Subscription();

    cities.forEach(city => {
      // immediate fetch
      this.fetchCityOnce(city);

      // auto refresh pipeline
      const refreshSub = interval(this.refreshMs).pipe(
        startWith(0),
        switchMap(() => this.weatherService.getWeatherByCity(city, this.units)),
        catchError(err => of({ error: true, message: 'Failed to refresh' })),
        tap(res => this.applyResultToState(city, res))
      ).subscribe();

      this.subs.add(refreshSub);
    });
  }

  private fetchCityOnce(city: string) {
    this.cityStates[city] = { loading: true, data: null, error: null };
    this.weatherService.getWeatherByCity(city, this.units).subscribe(res => {
      this.applyResultToState(city, res);
    });
  }

  private applyResultToState(city: string, res: any) {
    if (!this.cityStates[city]) this.cityStates[city] = { loading: false };
    if (res?.error) {
      this.cityStates[city].loading = false;
      this.cityStates[city].error = res.message || 'Error';
      this.cityStates[city].data = null;
    } else {
      this.cityStates[city].loading = false;
      this.cityStates[city].data = res as WeatherView;
      this.cityStates[city].error = null;
    }
  }
}
