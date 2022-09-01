import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent {
  code: string = '';
  groupName: string = '';
  groupTournament: string = '';

  availableTournaments: string[] = ['MM-kisat', 'Futsal-liiga', 'SM-liga'];
}
