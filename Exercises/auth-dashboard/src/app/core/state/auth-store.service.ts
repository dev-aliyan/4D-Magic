import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: number;
  email: string;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthStoreService {
  
  private _user = new BehaviorSubject<User | null>(null);
  user$ = this._user.asObservable();

  setUser(user: User | null) {
    this._user.next(user);
  }

  get currentUser() {
    return this._user.value;
  }

  isAuthenticated() : boolean {
    return !!this._user.value;
  }

}
