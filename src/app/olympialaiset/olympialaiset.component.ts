import { Component } from '@angular/core';
import { tournaments, User } from '../home/home.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-olympialaiset',
  templateUrl: './olympialaiset.component.html',
  styleUrls: ['./olympialaiset.component.scss']
})
export class OlympialaisetComponent {
  competition = tournaments[0];
  user: User | null = null;

  constructor(private userService: UserService) {
    userService.getUser('Aapo').then(user => this.user = user);
  }
}
