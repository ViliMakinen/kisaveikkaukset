import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent {
  logIn(): void {
    window.location.replace('/api/oauth2/google?redirect_url=/overview');
  }
}
