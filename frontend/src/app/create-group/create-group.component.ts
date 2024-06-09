import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TournamentWithId } from '../constants';
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

  availableTournaments$: Observable<TournamentWithId[]>;

  constructor(
    private tournamentService: TournamentService,
    private groupService: GroupService,
    private router: Router,
  ) {
    this.availableTournaments$ = this.tournamentService.getAllTournaments();
  }

  createNewGroup(): void {
    this.groupService.createNewGroup(this.groupName, this.tournamentId!).subscribe((group) => {
      this.router.navigate(['overview/', group.id]);
    });
  }

  isValid(): string {
    if (this.groupName !== '' && this.tournamentId !== null) {
      return 'secondary-container';
    }
    return '';
  }
}
