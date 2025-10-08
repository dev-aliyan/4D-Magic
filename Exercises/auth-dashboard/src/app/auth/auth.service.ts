import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthStoreService, User } from '../core/state/auth-store.service';
import { concatMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://jsonplaceholder.typicode.com';

  // baseUrl = 'https://reqres.in/api';

  constructor(private http: HttpClient, private authStore: AuthStoreService) { }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, { email, password }).pipe(
      concatMap(res => {
        return this.http.get<User>(`${this.baseUrl}/users/2`).pipe(
          tap(user => this.authStore.setUser({...user, token: res.token}))
        )
      })
    )
  }

  logout() {
    this.authStore.setUser(null)
  }
}
