import { UserService } from './../user.service';
import { Component } from '@angular/core';
import { MatchResult, tournament, TournamentWithGroups } from './../constants';
import { GroupStanding } from './../constants';
import { Result } from './../constants';

@Component({
  selector: 'app-mm-kisat',
  templateUrl: './mm-kisat.component.html',
  styleUrls: ['./mm-kisat.component.scss'],
})
export class MmKisatComponent {
  results: MatchResult[];
  groups: GroupStanding[];
  tournament: TournamentWithGroups = tournament;

  constructor(public userService: UserService) {
    const matches = this.tournament.groups.flatMap((group) => group.matches);
    this.results = matches.map((match) => {
      return { id: match.id, result: null };
    });
    this.groups = this.tournament.groups.map((group) => {
      const teams = group.matches.map((match) => match.away);
      const uniqueTeams = [...new Set(teams)];
      return {
        name: group.name,
        teams: uniqueTeams.map((team) => {
          return { name: team, points: 0 };
        }),
      };
    });
  }

  arePredictionsIncomplete(): boolean {
    return this.results.some((result) => result.result === null);
  }

  saveResult(id: number, result: Result): void {
    const index = this.results.findIndex((result) => result.id === id);
    this.results[index] = { id, result };
  }

  getGroup(groupName: string): GroupStanding {
    return this.groups.find((group) => group.name === groupName)!;
  }

  lockPredictions(): void {
    this.userService.arePredictionsLocked = true;
    console.log(this.results);
  }
}
