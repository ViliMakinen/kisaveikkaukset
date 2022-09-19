import { Component } from '@angular/core';
import { Match, MatchResult, Result, tournament, TournamentWithGroups } from '../constants';
import { UserService } from '../user.service';
import { isBefore } from 'date-fns';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
})
export class AdminViewComponent {
  results: MatchResult[];
  tournament: TournamentWithGroups = tournament;
  matches: Match[];
  userPredictions: MatchResult[] = [];

  constructor(public userService: UserService) {
    const matches = this.tournament.groups.flatMap((group) => group.matches);
    this.results = matches.map((match) => {
      return { id: match.id, result: null };
    });
    this.matches = this.tournament.groups.flatMap((group) => group.matches);
    this.matches.sort((a, b) => {
      if (isBefore(a.date, b.date)) {
        return -1;
      } else {
        return 1;
      }
    });
    this.initializeUserPredictions();
  }

  initializeUserPredictions(): void {
    if (localStorage.getItem('result')) {
      this.userPredictions = JSON.parse(localStorage.getItem('result')!);
    } else {
      const matches = this.tournament.groups.flatMap((group) => group.matches);
      this.userPredictions = matches.map((match) => {
        return { id: match.id, result: null };
      });
    }
  }

  saveResult(id: number, result: Result): void {
    const index = this.userPredictions.findIndex((result) => result.id === id);
    this.userPredictions[index] = { id, result };
    localStorage.setItem('result', JSON.stringify(this.userPredictions));
  }

  isSet(id: number): Result {
    const index = this.userPredictions.findIndex((result) => result.id === id);
    return this.userPredictions[index].result;
  }
}
