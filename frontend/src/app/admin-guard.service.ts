import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard  {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(): boolean {
    if (
      this.userService.user?.email === 'aapo.kallio@gmail.com' ||
      this.userService.user?.email === 'makinenvi@gmail.com'
    ) {
      return true;
    } else {
      this.router.navigateByUrl('');
      return false;
    }
  }
}
