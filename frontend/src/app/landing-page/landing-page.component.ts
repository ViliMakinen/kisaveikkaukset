import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

// interface PlayerGroup {}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  // groups$: Observable<PlayerGroup[]>;
  // groups: PlayerGroup[] = [];
  tournaments: string[] = ['mm-kisat', 'em-kisat', 'liiga'];
  code = '';
  failMessage: string | null = null;

  constructor(private router: Router, private userService: UserService) {
    // this.groups$ = this.groupService.getGroups(this.userService.user?.id).subscribe(groups => {
    //   if (groups.length === 1) {
    //     this.rerouting();
    //   } else {
    //     this.groups = groups
    //   }
    //
    // });
    //this.rerouting();
  }

  tryJoiningGroup() {
    if (this.code === '123') {
      this.router.navigateByUrl('/turnauksenSivu');
    } else {
      this.failMessage = 'Koodilla ei löytynyt ryhmää';
    }
  }

  // rerouting() {
  //   this.router.navigateByUrl('home');
  // }
}
