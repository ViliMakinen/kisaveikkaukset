import { Component } from '@angular/core';
import { Match, MatchResult, Tournament, TournamentWithResults } from '../constants';
import { UserService } from '../user.service';
import { isBefore } from 'date-fns';
import { Observable } from 'rxjs';
import { TournamentService } from '../tournament.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
})
export class AdminViewComponent {
  results: MatchResult[] = [];
  tournamentWithResults$: Observable<TournamentWithResults> = this.tournamentService.getTournamentById(1);
  tournament: Tournament | null = null;
  matches: Match[] = [];
  userPredictions: MatchResult[] = [];

  constructor(public userService: UserService, private tournamentService: TournamentService) {
    this.tournamentWithResults$.subscribe((tournamentWithResults) => {
      this.tournament = tournamentWithResults.tournament;
      this.results = tournamentWithResults.results;
      this.matches = this.tournament.groups.flatMap((group) => group.matches);
      this.matches.sort((a, b) => {
        if (isBefore(a.date, b.date)) {
          return -1;
        } else {
          return 1;
        }
      });
    });
  }
}
