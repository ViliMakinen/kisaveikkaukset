import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

interface PlayerGroup {}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  // groups$: Observable<PlayerGroup[]>;
  groups: PlayerGroup[] = [];

  constructor(private router: Router, private userService: UserService) {
    // this.groups$ = this.groupService.getGroups(this.userService.user?.id).subscribe(groups => {
    //   if (groups.length === 1) {
    //     this.rerouting();
    //   } else {
    //     this.groups = groups
    //   }
    //
    // });

    this.rerouting();
  }

  rerouting() {
    this.router.navigateByUrl('home');
  }
}
