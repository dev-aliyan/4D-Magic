import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserProfile {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  profilePicture: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private defaultProfile: UserProfile = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    profilePicture: ''
  };

  private userSubject = new BehaviorSubject<UserProfile>(this.defaultProfile);
  user$ = this.userSubject.asObservable();

  updateUser(profile: UserProfile) {
    this.userSubject.next(profile);
  }

  getUser(): UserProfile {
    return this.userSubject.value;
  }
}
