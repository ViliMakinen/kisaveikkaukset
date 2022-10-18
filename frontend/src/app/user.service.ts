import { Injectable } from '@angular/core';
import { User } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: Partial<User> | null = null;
  arePredictionsLocked: boolean = false;
}
