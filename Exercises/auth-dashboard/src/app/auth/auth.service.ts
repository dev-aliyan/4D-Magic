import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthStoreService, User } from '../core/state/auth-store.service';
import { concatMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient, private authStore: AuthStoreService) { }

  login(email: string, password: string) {
    return this.http.post<{ id: number }>(`${this.baseUrl}/posts`, { email, password }).pipe(
      concatMap(res => {
        return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
          tap(user => this.authStore.setUser({ ...user, token: String(res.id) }))
        );
      })
    );
  }

  logout() {
    this.authStore.setUser(null)
  }
}
