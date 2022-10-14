import { Component } from '@angular/core';
import { SidenavService } from '../sidenav.service';

@Component({
  selector: 'app-home',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  constructor(public sidenavService: SidenavService) {
  }
}
