import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {}

  getUserByEmail(email: string): User | undefined {
    const savedUsers = localStorage.getItem('renthub_users');

    if (!savedUsers) {
      return undefined;
    }

    const users: User[] = JSON.parse(savedUsers);

    return users.find(
      user => user.email === email
    );
  }

  getAllUsers(): User[] {
    const savedUsers = localStorage.getItem('renthub_users');

    if (!savedUsers) {
      return [];
    }

    return JSON.parse(savedUsers);
  }
}