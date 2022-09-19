import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import { GroupStanding, MatchResult, Result, tournament, TournamentWithGroups } from '../constants';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, isAfter } from 'date-fns';

@Component({
  selector: 'app-mm-kisat',
  templateUrl: './mm-kisat.component.html',
  styleUrls: ['./mm-kisat.component.scss'],
})
export class MmKisatComponent implements OnInit {
  userPredictions: MatchResult[] = [];
  groups: GroupStanding[];
  tournament: TournamentWithGroups = tournament;
  results: MatchResult[] = [];

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

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
  }

  ngOnInit(): void {
    this.startCountdown();
    this.calculateCountdownValues();
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
    this.updateUserPredictions();
  }

  updateUserPredictions(): void {
    const matches = this.tournament.groups.flatMap((group) => group.matches);

    this.userPredictions.forEach((matchResult) => {
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
    this.groups.forEach((group) => group.teams.sort((a, b) => a.predictedPoints - b.predictedPoints).reverse());
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
  }

  modifyTeamPoints(teamName: string, amount: number): void {
    this.groups = this.groups.map((group) => {
      return {
        name: group.name,
        teams: group.teams.map((team) => {
          if (team.name === teamName) {
            return { ...team, predictedPoints: team.predictedPoints + amount };
          }
          return { ...team };
        }),
      };
    });
  }

  startCountdown(): void {
    setInterval(() => this.calculateCountdownValues(), 1000);
  }

  calculateCountdownValues(): void {
    const now = new Date();
    this.days = Math.floor(differenceInDays(tournament.startingDate, now));
    this.hours = Math.floor(differenceInHours(tournament.startingDate, now) % 24);
    this.minutes = Math.floor(differenceInMinutes(tournament.startingDate, now) - this.days * 24 * 60 - this.hours * 60);
    this.seconds = Math.floor(differenceInSeconds(tournament.startingDate, now) - this.days * 24 * 60 * 60 - this.hours * 60 * 60 - this.minutes * 60);
  }

  arePredictionsIncomplete(): boolean {
    return this.userPredictions.some((result) => result.result === null);
  }

  savePrediction(id: number, result: Result): void {
    const index = this.userPredictions.findIndex((result) => result.id === id);
    this.userPredictions[index] = { id, result };
    localStorage.setItem(this.userService.user?.firstName + 'predictions', JSON.stringify(this.userPredictions));
    this.resetUserPredictions();
    this.updateUserPredictions();
  }

  isSelected(id: number): Result {
    const index = this.userPredictions.findIndex((result) => result.id === id);
    return this.userPredictions[index].result;
  }

  getGroup(groupName: string): GroupStanding {
    return this.groups.find((group) => group.name === groupName)!;
  }

  lockPredictions(): void {
    this.userService.arePredictionsLocked = true;
  }

  unlockPredictions(): void {
    this.userService.arePredictionsLocked = false;
  }

  fillPredictions(): void {
    this.userPredictions.forEach((result) => {
      result.result = '1';
    });
  }

  hasTournamentStarted(): boolean {
    return isAfter(new Date(), this.tournament.startingDate);
  }

  arePredictionsCorrect(id: number, value: Result): string {
    const index = this.userPredictions.findIndex((result) => result.id === id);
    if (this.results[index].result === null) {
      return '';
    } else if (this.results[index].result === this.userPredictions[index].result && this.userPredictions[index].result === value) {
      return '#42FF5A';
    } else if (this.results[index].result !== this.userPredictions[index].result && this.userPredictions[index].result === value) {
      return 'red';
    } else {
      return '';
    }
  }

  private resetUserPredictions(): void {
    this.groups = this.groups.map((group) => {
      return {
        ...group,
        teams: group.teams.map((team) => {
          return { ...team, predictedPoints: 0 };
        }),
      };
    });
  }
}
