import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Predictions, User } from './constants';

const emptyUser: User = { id: 0, nickName: '', firstName: '', lastName: '', email: '' };

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User = emptyUser;
  arePredictionsLocked: boolean = false;

  constructor(private http: HttpClient) {}

  addNickName(nickName: string): Observable<any> {
    return this.http.post<any>('api/users', {
      nickName,
    });
  }

  updatePredictions(predictions: Predictions, groupId: number): Observable<User> {
    return this.http.post<User>('api/predictions', {
      predictions,
      groupId,
    });
  }
}
