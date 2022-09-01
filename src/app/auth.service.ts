import { Injectable } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private socialAuthService: SocialAuthService, private router: Router, private userService: UserService) {
    this.socialAuthService.authState.subscribe((user) => {
      if (user === null) {
        this.router.navigate(['/']);
      } else {
        this.userService.user = user;
        this.navigateToApp();
      }
    });
  }

  navigateToApp(): void {
    this.router.navigate(['/home']);
  }
}
