import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GroupWithIdAndName } from '../constants';
import { GroupService } from '../group.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  code = '';
  failMessage: string | null = null;
  group$: Observable<GroupWithIdAndName[]>;
  nickName: string = '';

  constructor(private router: Router, private groupService: GroupService, private userService: UserService) {
    this.group$ = this.groupService.getUsersGroups();
  }

  tryJoiningGroup(): void {
    this.groupService.joinGroup(this.code).subscribe(
      (group) => {
        this.router.navigate(['overview/', group.groupId]);
      },
      (error) => {
        this.code = '';
        console.log(error);
        this.failMessage = 'Koodilla ei löytynyt ryhmää';
      },
    );
  }

  addNickName(): void {
    this.userService.addNickName(this.nickName).subscribe((foo) => console.log(foo));
  }

  navigatoToGroup(id: number): void {
    this.router.navigate(['overview/', id]);
  }
}
