import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
})
export class SideNavigationComponent {
  constructor(private router: Router, private userService: UserService) {}

  isAdmin(): boolean {
    return this.userService.user?.firstName === 'Aapo';
  }
}
