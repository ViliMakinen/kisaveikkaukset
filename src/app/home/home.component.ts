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

  constructor(public userService: UserService) {
    this.mockUsers = this.mockUsers.map((user) => {
      return { name: user.name, points: user.points };
    });
    this.mockGames = this.mockGames.map((game) => {
      return { home: game.home, away: game.away, date: game.date };
    });
  }

  todaysGames = Object.entries(this.mockGames);

  usersByPoints = this.mockUsers.sort((a, b) => a.points - b.points).reverse();
  today = new Date();

  //For later use. See 17. on todo
  testData = {
    match: 'Suomi - Ruotsi',
    weightings: {
      '1': 33,
      X: 33,
      '2': 33,
    },
  };
}
