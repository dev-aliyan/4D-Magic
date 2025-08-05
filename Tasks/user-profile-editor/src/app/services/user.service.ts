import { Injectable } from '@angular/core';

export interface User {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User = {
    firstName: 'John',
    lastName: 'Doe',
    userName: 'johndoe',
    email: 'john@example.com'
  };

  getUser(): User {
    return this.user;
  }

  setUser(user: User): void {
    this.user = user;
  }
}