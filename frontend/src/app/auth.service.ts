import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable()
export class AuthService {
  user = new Subject<Partial<User>>();

  constructor(private router: Router, private userService: UserService, private http: HttpClient) {
  }

  isSignedIn(): Observable<Partial<User>> {
    return this.http.get<Partial<User>>('/api/users/me');
  }
}
