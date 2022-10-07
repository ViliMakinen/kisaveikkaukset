import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MockUser } from './constants';
import { User } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: Partial<User> | null = null;
  arePredictionsLocked: boolean = false;
  codeValidity: boolean = false;
  points: number = 0;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<MockUser[]> {
    return this.http.get<MockUser[]>('api/users');
  }
}
