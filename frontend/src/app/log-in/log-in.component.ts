import { UserService } from '../user.service';
import { Component } from '@angular/core';
import { loginCode } from '../constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  code: string = '';
  groupName: string = '';
  failMessage: string | null = null;

  constructor(private router: Router, private userService: UserService) {}

  tryLogIn() {
    if (this.code === loginCode) {
      this.userService.codeValidity = true;
      this.router.navigateByUrl('/authorization');
    } else {
      this.failMessage = 'Virheellinen koodi!';
    }
  }
}
