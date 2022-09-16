import { Component } from '@angular/core';
import { games, MockGame, MockUser, users } from '../constants';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  mockUsers: MockUser[] = users;
  mockGames: MockGame[] = games;
  today = new Date();

  constructor(public userService: UserService) {
    this.mockUsers.sort((a, b) => a.points - b.points).reverse();
  }
}
