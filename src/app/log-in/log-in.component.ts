import { Component } from '@angular/core';
import { loginCodes } from '../constants';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  code: string = '';
  groupName: string = '';
  groupTournament: string = '';

  availableTournaments: string[] = ['MM-kisat', 'Futsal-liiga', 'SM-liga'];

  constructor(private userService: UserService, private router: Router) {
    userService.logOut();
  }

  foo() {
    console.log(this.groupName);
    console.log(this.groupTournament)
  }

  tryLogIn() {
    Object.entries(loginCodes).forEach((keyValue) => {
      if (keyValue[0] === this.code) {
        this.userService.getUser(keyValue[1]).then(() => {
          this.router.navigateByUrl('/home');
        });
      }
    });
  }
}
