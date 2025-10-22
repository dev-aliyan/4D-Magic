import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user';
import usersData from '../../../assets/users.json';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.loadUsers();

    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

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

  generateUserId(): string {
    if (!this.users || this.users.length === 0) {
      return 'USR-001';
    }
    const lastUser = this.users[this.users.length - 1];
    const lastIdNumber = parseInt(lastUser.id.split('-')[1], 10);
    const newIdNumber = lastIdNumber + 1;
    return `USR-${newIdNumber.toString().padStart(3, '0')}`;
  }

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }

  isAdmin(): boolean {
    return this.getCurrentUser()?.role === 'admin';
  }

  addUser(user: User): void {
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  findUserByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }
}
