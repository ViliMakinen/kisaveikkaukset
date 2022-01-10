import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { players, tournaments, User } from '../constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  players = players;
  tournaments = tournaments;

  user: User | null;
  users: User[] | null = null;

  constructor(public userService: UserService) {
    userService.getUsers().then(users => this.users = users);
    this.user = userService.getCurrentUser();
  }
}
