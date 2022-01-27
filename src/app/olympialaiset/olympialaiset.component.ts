import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Tournament, tournaments, User } from '../constants';

@Component({
  selector: 'app-olympialaiset',
  templateUrl: './olympialaiset.component.html',
  styleUrls: ['./olympialaiset.component.scss'],
})
export class OlympialaisetComponent {
  competition = tournaments[0] as Tournament;
  user: User | null = null;

  constructor(private userService: UserService) {
    this.user = userService.getCurrentUser();
  }
}
