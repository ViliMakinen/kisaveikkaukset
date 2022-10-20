import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './constants';

@Injectable()
export class AuthService {
  user = new Subject<User>();

  constructor(private router: Router, private userService: UserService, private http: HttpClient) {}

  isSignedIn(): Observable<User> {
    return this.http.get<User>('/api/users/me');
  }
}
