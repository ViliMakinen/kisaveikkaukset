import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GroupWithIdAndName, User } from '../constants';
import { GroupService } from '../group.service';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  currentUser: User;
  code = '';
  failMessage: string | null = null;
  group$: Observable<GroupWithIdAndName[]>;

  constructor(
    private router: Router,
    private groupService: GroupService,
    private userService: UserService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) {
    this.group$ = this.groupService.getUsersGroups();
    this.currentUser = this.userService.user;
  }

  openSnackBar(message: string): void {
    this.snackbar.open(message, '', { duration: 1500 });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { nickName: this.currentUser.nickName ? this.currentUser.nickName : '' },
    });

    dialogRef.afterClosed().subscribe((nickName) => {
      if (nickName) {
        this.currentUser.nickName = nickName;
        this.addNickName(nickName);
      }
    });
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

  addNickName(nickName: string): void {
    this.userService.addNickName(nickName).subscribe((user) => {
      this.openSnackBar('Nimi vaihdettu: ' + user.nickName);
    });
  }

  navigatoToGroup(id: number): void {
    this.router.navigate(['overview/', id]);
  }
}
