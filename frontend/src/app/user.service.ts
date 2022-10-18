import { Injectable } from '@angular/core';
import { User } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: Partial<User> | null = null;
  arePredictionsLocked: boolean = false;

  constructor(private http: HttpClient) {}

  addNickName(nickName: string): Observable<any> {
    return this.http.post<any>('api/users', {
      nickName,
    });
  }
}
