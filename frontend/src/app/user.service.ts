import {Injectable} from '@angular/core';
import {SocialUser} from '@abacritt/angularx-social-login';
import {HttpClient} from '@angular/common/http';
import {delay, Observable} from 'rxjs';
import {MockUser} from './constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: SocialUser | null = null;
  arePredictionsLocked: boolean = false;
  codeValidity: boolean = false;
  points: number = 0;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<MockUser[]> {
    return this.http.get<MockUser[]>('api/users').pipe(delay(1000));
  }


}
