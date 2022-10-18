import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GroupWithIdAndName } from '../constants';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  code = '';
  failMessage: string | null = null;
  group$: Observable<GroupWithIdAndName[]>;

  constructor(private router: Router, private groupService: GroupService) {
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

  navigatoToGroup(id: number): void {
    this.router.navigate(['overview/', id]);
  }
}
