import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User | null = null;
  arePredictionsLocked: boolean = false;

  constructor(private http: HttpClient) {}

  addNickName(nickName: string): Observable<any> {
    return this.http.post<any>('api/users', {
      nickName,
    });
  }
}
