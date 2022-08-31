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
  groupTournament: string = '';

  availableTournaments: string[] = ['MM-kisat', 'Futsal-liiga', 'SM-liga'];

  constructor(private router: Router) {}

  tryLogIn() {
    if (this.code === loginCode) {
      this.router.navigateByUrl('/home');
    }
  }
}
