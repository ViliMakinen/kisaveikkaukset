import { UserService } from './../user.service';
import { AfterViewInit, Component } from '@angular/core';
import { MatchResult, tournament, TournamentWithGroups } from './../constants';
import { GroupStanding } from './../constants';
import { Result } from './../constants';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

@Component({
  selector: 'app-mm-kisat',
  templateUrl: './mm-kisat.component.html',
  styleUrls: ['./mm-kisat.component.scss'],
})
export class MmKisatComponent implements AfterViewInit {
  results: MatchResult[];
  groups: GroupStanding[];
  tournament: TournamentWithGroups = tournament;

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

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

  ngAfterViewInit(): void {
    this.startCountdown();
  }

  startCountdown(): void {
    setInterval(() => calculateCountdownValues(), 1000);

    const calculateCountdownValues = (): void => {
      const now = new Date();

      const days = Math.floor(differenceInDays(tournament.startingDate, now));
      const hours = Math.floor(differenceInHours(tournament.startingDate, now) % 24);
      const minutes = Math.floor(differenceInMinutes(tournament.startingDate, now) - days * 24 * 60 - hours * 60);
      const seconds = Math.floor(differenceInSeconds(tournament.startingDate, now) - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60);

      this.days = days;
      this.hours = hours;
      this.minutes = minutes;
      this.seconds = seconds;
    };
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
  }

  unlockPredictions(): void {
    this.userService.arePredictionsLocked = false;
  }

  fillPredictions(): void {
    this.results.forEach((result) => {
      result.result = '1';
    });
  }

  hasTournamentStarted(): boolean {
    const now = new Date();
    return now.getTime() > this.tournament.startingDate.getTime();
  }
}
