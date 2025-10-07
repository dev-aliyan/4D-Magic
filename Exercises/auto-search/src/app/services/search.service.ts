import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SearchService {

  private apiKey = ''
  private base = 'https://en.wikipedia.org/w/api.php';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<string[]> {
    if (!query.trim()) return of([]); // return empty list if no query

    const params = new HttpParams()
      .set('action', 'opensearch')
      .set('format', 'json')
      .set('origin', '*')
      .set('search', query);

    return this.http.get<any>(this.base, { params }).pipe(
      map((res: any) => res[1]), // Wikipedia returns [query, [results], ...]
      catchError(() => of([]))   // fallback empty list on error
    );
  }
}
