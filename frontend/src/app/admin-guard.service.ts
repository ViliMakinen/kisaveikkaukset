import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(): boolean {
    if (this.userService.user?.firstName === 'Aapo') {
      return true;
    } else {
      this.router.navigateByUrl('');
      return false;
    }
  }
}
