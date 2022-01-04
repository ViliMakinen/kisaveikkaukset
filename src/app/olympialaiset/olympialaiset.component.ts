import { Component } from '@angular/core';
import { tournaments } from '../home/home.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-olympialaiset',
  templateUrl: './olympialaiset.component.html',
  styleUrls: ['./olympialaiset.component.scss']
})
export class OlympialaisetComponent {
  competition = tournaments[0];
  user: string | null;

  constructor(private userService: UserService) {
    this.user = userService.getUser();
  }
}
