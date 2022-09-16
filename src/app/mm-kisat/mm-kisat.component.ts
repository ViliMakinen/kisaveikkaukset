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
          return { name: team, points: 0 };
        }),
      };
    });
    this.initializeUserPredictions();
  }

  ngOnInit(): void {
    this.startCountdown();
    this.calculateCountdownValues();
  }

  initializeUserPredictions(): void {
    if (localStorage.getItem(this.userService.user?.firstName + 'predictions')) {
      this.userPredictions = JSON.parse(localStorage.getItem(this.userService.user?.firstName + 'predictions')!);;
    } else {
      const matches = this.tournament.groups.flatMap((group) => group.matches);
      this.userPredictions = matches.map((match) => {
        return { id: match.id, result: null };
      });
    }
    console.log(this.userPredictions;);
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
}
