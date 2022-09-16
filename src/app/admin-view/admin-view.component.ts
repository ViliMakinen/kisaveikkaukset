import { Component, OnInit } from '@angular/core';
import { Match, MatchResult, Result, tournament, TournamentWithGroups } from '../constants';
import { UserService } from '../user.service';
import { isBefore } from 'date-fns';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
})
export class AdminViewComponent implements OnInit {
  results: MatchResult[];
  tournament: TournamentWithGroups = tournament;
  matches: Match[];

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
  }

  saveResult(id: number, result: Result): void {
    const index = this.results.findIndex((result) => result.id === id);
    this.results[index] = { id, result };
  }

  ngOnInit(): void {}
}
