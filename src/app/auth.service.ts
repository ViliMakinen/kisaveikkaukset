import { Injectable } from '@angular/core';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private socialAuthService: SocialAuthService, private router: Router) {
    this.socialAuthService.authState.subscribe((user) => {
      if (user === null) {
        this.router.navigate(['/']);
      } else {
        console.log(user);
      }
    });
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => this.navigateToApp());
  }

  signInWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(() => this.navigateToApp());
  }

  navigateToApp(): void {
    this.router.navigate(['/home']);
  }
}
