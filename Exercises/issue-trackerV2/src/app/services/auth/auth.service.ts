import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService) {}

  login(email: string, password: string): boolean {
    const foundUser = this.userService
      .getAllUsers()
      .find(u => u.email === email && u.password === password);

    if (foundUser) {
      this.userService.setCurrentUser(foundUser);
      return true;
    }
    return false;
  }

  signup(user: User): void {
    const exists = this.userService.findUserByEmail(user.email);
    if (exists) {
      throw new Error('User already exists!');
    }

    const newUser: User = {
      ...user,
      id: this.userService.generateUserId(),
      createdAt: new Date(),
    };

    this.userService.addUser(newUser);
    this.userService.setCurrentUser(newUser);
  }

  logout(): void {
    this.userService.setCurrentUser(null);
    console.log('Logged out from AuthService');
  }

  isLoggedIn(): boolean {
    return !!this.userService.getCurrentUser();
  }
}
