import { Component } from '@angular/core';
import { SidenavService } from '../sidenav.service';

@Component({
  selector: 'app-home',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent {
  constructor(public sidenavService: SidenavService) {
  }
}
