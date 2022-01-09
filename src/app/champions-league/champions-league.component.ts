import { Component } from '@angular/core';
import { tournaments, User } from '../home/home.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-champions-league',
  templateUrl: './champions-league.component.html',
  styleUrls: ['./champions-league.component.scss']
})
export class ChampionsLeagueComponent {

  competition = tournaments[1];
  user: User | null = null;

  constructor(private userService: UserService) {
    userService.getUser('Aapo').then(user => this.user = user);
  }

  submitUserSelections(user: User) {
    this.userService.updateUser(user);
  }
}
