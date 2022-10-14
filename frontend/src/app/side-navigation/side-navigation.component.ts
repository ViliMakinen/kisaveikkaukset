import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SidenavService } from '../sidenav.service';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
})
export class SideNavigationComponent {
  @Output()
  closeSidenav = new EventEmitter<void>();

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private sidenavService: SidenavService) {
  }

  isAdmin(): boolean {
    return this.userService.user?.email === 'aapo.kallio@gmail.com' || this.userService.user?.email === 'makinenvi@gmail.com';
  }

  routeTo(path: string): void {
    this.closeSidenav.emit();
    const groupId = this.route.snapshot.params['groupId'];
    if (path === '') {
      this.router.navigate(['overview/', groupId]);
    } else {
      this.router.navigate(['overview/', groupId, path]);
    }
  }
}
