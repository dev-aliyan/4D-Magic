import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import usersData from '../modules/auth/mock/users.json';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = [];
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.loadUsers(); // Load users from mock data or localStorage

    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  /** Load users from localStorage or mock file */
  private loadUsers(): void {
    const stored = localStorage.getItem('users');
    if (stored) {
      this.users = JSON.parse(stored);
    } else {
      this.users = (usersData as any[]).map(u => ({
        ...u,
        createdAt: new Date(u.createdAt),
      })) as User[];

      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  login(email: string, password: string): boolean {
    const foundUser = this.users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      this.currentUserSubject.next(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }

    return false;
  }

  signup(user: User): void {
    const exists = this.users.find(u => u.email === user.email);
    if (exists) {
      throw new Error('User already exists!');
    }

    const newUser: User = {
      ...user,
      id: this.generateUserId(), 
      createdAt: new Date(),
    };

    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));

    this.currentUserSubject.next(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  }

  private generateUserId(): string {
    if (!this.users || this.users.length === 0) {
      return 'USR-001';
    }

    const lastUser = this.users[this.users.length - 1];
    const lastIdNumber = parseInt(lastUser.id.split('-')[1], 10);
    const newIdNumber = lastIdNumber + 1;
    return `USR-${newIdNumber.toString().padStart(3, '0')}`;
  }


  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    console.log('log out from auth service')
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }


  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }



  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}
