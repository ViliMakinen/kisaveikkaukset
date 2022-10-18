import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TournamentWithId } from '../constants';
import { UserService } from '../user.service';
import { TournamentService } from '../tournament.service';
import { GroupService } from '../group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent {
  groupName: string = '';
  tournamentId: number | null = null;

  availableTournaments$: Observable<TournamentWithId[]> = this.tournamentService.getAllTournaments();

  constructor(
    public userService: UserService,
    private tournamentService: TournamentService,
    private groupService: GroupService,
    private router: Router,
  ) {}

  createNewGroup(): void {
    this.groupService
      .createNewGroup(this.groupName, this.tournamentId!)
      .subscribe((group) => this.router.navigate(['overview/', group.groupId]));
  }
}
