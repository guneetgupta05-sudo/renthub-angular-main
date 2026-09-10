import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: User[] = [];

  private currentUser: User | null = null;

  constructor() {

    const savedUsers = localStorage.getItem('renthub_users');

    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    }

    const savedUser = localStorage.getItem('renthub_current_user');

    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  register(
    name: string,
    email: string,
    password: string
  ): boolean {

    const existingUser = this.users.find(
      user => user.email === email
    );

    if (existingUser) {
      return false;
    }

    const newUser: User = {
      id: Date.now(),
      name: name,
      email: email,
      password: password
    };

    this.users.push(newUser);

    localStorage.setItem(
      'renthub_users',
      JSON.stringify(this.users)
    );

    return true;
  }

  login(
    email: string,
    password: string
  ): boolean {

    const user = this.users.find(
      user =>
        user.email === email &&
        user.password === password
    );

    if (!user) {
      return false;
    }

    this.currentUser = user;

    localStorage.setItem(
      'renthub_current_user',
      JSON.stringify(user)
    );

    return true;
  }

  logout(): void {

    this.currentUser = null;

    localStorage.removeItem('renthub_current_user');
  }

  getCurrentUser(): User | null {

    return this.currentUser;
  }

  isLoggedIn(): boolean {

    return this.currentUser !== null;
  }
}