import { Component } from '@angular/core';
import { isBefore, isSameDay } from 'date-fns';
import { GroupStanding, Match, MatchResult, MockUser, tournament, TournamentWithGroups } from '../constants';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  userPredictions: MatchResult[] = [];
  groups: GroupStanding[];
  tournament: TournamentWithGroups = tournament;
  results: MatchResult[] = [];
  mockUsers$: Observable<MockUser[]> = this.userService.getUsers();
  today = new Date();
  gamesToday: Match[] = [];
  actualUsers: any = null;

  constructor(public userService: UserService) {
    this.groups = this.tournament.groups.map((group) => {
      const teams = group.matches.map((match) => match.away);
      const uniqueTeams = [...new Set(teams)];
      return {
        name: group.name,
        teams: uniqueTeams.map((team) => {
          return { name: team, points: 0, predictedPoints: 0 };
        }),
      };
    });
    this.initializeUserPredictions();
    this.initializeResults();
    this.getGamesToday();
    this.calculateUserPoints();
  }

  initializeUserPredictions(): void {
    if (localStorage.getItem(this.userService.user?.firstName + 'predictions')) {
      this.userPredictions = JSON.parse(localStorage.getItem(this.userService.user?.firstName + 'predictions')!);
    } else {
      const matches = this.tournament.groups.flatMap((group) => group.matches);
      this.userPredictions = matches.map((match) => {
        return { id: match.id, result: null };
      });
    }
  }

  getGamesToday(): void {
    this.gamesToday = this.tournament.groups.flatMap((group) => group.matches).filter((match) => isSameDay(match.date, new Date('2022-11-21T19:00:00')));
    this.gamesToday.sort((a, b) => {
      if (isBefore(a.date, b.date)) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  //TODO: currently uses isSameDay for testing purposes before tournament starts, change to isToday later

  getGroup(groupName: string): GroupStanding {
    return this.groups.find((group) => group.name === groupName)!;
  }

  calculateUserPoints(): void {
    const matches = this.tournament.groups.flatMap((group) => group.matches);
    matches.forEach((match) => {
      if (this.results[match.id - 1].result === this.userPredictions[match.id - 1].result && this.userPredictions[match.id - 1].result !== null) {
        this.userService.points++;
      }
    });
  }

  initializeResults(): void {
    if (localStorage.getItem('result')) {
      this.results = JSON.parse(localStorage.getItem('result')!);
    } else {
      const matches = this.tournament.groups.flatMap((group) => group.matches);
      this.results = matches.map((match) => {
        return { id: match.id, result: null };
      });
    }

    const matches = this.tournament.groups.flatMap((group) => group.matches);

    this.results.forEach((matchResult) => {
      const match = matches.find((match) => match.id === matchResult.id)!;
      if (matchResult.result === '1') {
        this.modifyTeamPoints(match.home, 3);
      } else if (matchResult.result === 'X') {
        this.modifyTeamPoints(match.home, 1);
        this.modifyTeamPoints(match.away, 1);
      } else if (matchResult.result === '2') {
        this.modifyTeamPoints(match.away, 3);
      }
    });
    this.groups.forEach((group) => group.teams.sort((a, b) => a.points - b.points).reverse());
  }

  modifyTeamPoints(teamName: string, amount: number): void {
    this.groups = this.groups.map((group) => {
      return {
        name: group.name,
        teams: group.teams.map((team) => {
          if (team.name === teamName) {
            return { ...team, points: team.points + amount };
          }
          return { ...team };
        }),
      };
    });
  }

  sortUsers(mockUsers: MockUser[]): MockUser[] {
    return mockUsers.sort((a, b) => a.points - b.points).reverse();
  }
}
