import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { User } from './constants';

@Injectable()
export class LoggedInGuard  {
  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (environment.e2e) {
      return true;
    }
    return this.authService.isSignedIn().pipe(
      map((user: User) => {
        if (this.userService.user !== null) {
          this.userService.user = user;
        }
        return true;
      }),
      catchError(() => {
        this.router.navigate(['/']);
        return of(false);
      }),
    );
  }
}
