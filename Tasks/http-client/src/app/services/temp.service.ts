import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TempService {
  private apiKey = '802ced63a33d48eca5a65140252508';

  constructor(private http: HttpClient) {}

  public getJsonData(city: string) {
    return this.http.get(
      `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${city}`
    );
  }
}
