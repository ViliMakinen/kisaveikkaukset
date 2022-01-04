import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: string | null = null;

  constructor() {
  }

  getUser(): string | null {
    return this.user;
  }

  setUser(user: string): void {
    this.user = user;
  }
}
