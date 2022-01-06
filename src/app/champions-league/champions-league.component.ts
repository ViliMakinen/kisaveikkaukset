import { Component } from '@angular/core';
import { tournaments } from '../home/home.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-champions-league',
  templateUrl: './champions-league.component.html',
  styleUrls: ['./champions-league.component.scss']
})
export class ChampionsLeagueComponent {

  competition = tournaments[1];
  user: string | null;

  constructor(private userService: UserService) {
    this.user = userService.getUser();
  }

}
