import { Component, OnDestroy } from '@angular/core';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, isAfter, isBefore, isSameDay } from 'date-fns';
import { Match, MatchResult, MockUser, Tournament, TournamentWithResults } from '../constants';
import { UserService } from '../user.service';
import { Observable, Subscription } from 'rxjs';
import { TournamentService } from '../tournament.service';
import { ResultService } from '../result.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  userPredictions: MatchResult[] = [];
  tournamentWithResults$: Observable<TournamentWithResults> = this.tournamentService.getTournament();
  tournament: Tournament | null = null;
  results$: Observable<MatchResult[]> = this.resultsService.getResults();
  results: MatchResult[] | null = null;
  mockUsers$: Observable<MockUser[]> = this.userService.getUsers();
  today = new Date();
  gamesToday: Match[] = [];
  private tournamentSubscription: Subscription;

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  constructor(public userService: UserService, private tournamentService: TournamentService, private resultsService: ResultService) {
    this.tournamentSubscription = this.tournamentWithResults$.subscribe((tournamentWithResults) => {
      this.tournament = tournamentWithResults.tournament;
      this.results = tournamentWithResults.results;
      this.initializeEverything();
      this.startCountdown();
      this.calculateCountdownValues();
    });
  }

  startCountdown(): void {
    setInterval(() => this.calculateCountdownValues(), 1000);
  }

  calculateCountdownValues(): void {
    const now = new Date();
    this.days = Math.floor(differenceInDays(this.tournament!.startingDate, now));
    this.hours = Math.floor(differenceInHours(this.tournament!.startingDate, now) % 24);
    this.minutes = Math.floor(differenceInMinutes(this.tournament!.startingDate, now) - this.days * 24 * 60 - this.hours * 60);
    this.seconds = Math.floor(differenceInSeconds(this.tournament!.startingDate, now) - this.days * 24 * 60 * 60 - this.hours * 60 * 60 - this.minutes * 60);
  }

  ngOnDestroy(): void {
    this.tournamentSubscription.unsubscribe();
  }

  private initializeEverything() {
    this.initializeUserPredictions();
    this.initializeTodaysGames();
    this.initializeResults();
    this.calculateUserPoints();
  }

  initializeUserPredictions(): void {
    if (localStorage.getItem(this.userService.user?.firstName + 'predictions')) {
      this.userPredictions = JSON.parse(localStorage.getItem(this.userService.user?.firstName + 'predictions')!);
    } else {
      const matches = this.tournament!.groups.flatMap((group) => group.matches);
      this.userPredictions = matches.map((match) => {
        return { id: match.id, result: null };
      });
    }
  }

  calculateUserPoints(): void {
    const matches = this.tournament!.groups.flatMap((group) => group.matches);
    matches.forEach((match) => {
      if (this.results![match.id - 1].result === this.userPredictions[match.id - 1].result && this.userPredictions[match.id - 1].result !== null) {
        this.userService.points++;
      }
    });
  }

  initializeResults(): void {
    const matches = this.tournament!.groups.flatMap((group) => group.matches);

    this.results!.forEach((matchResult) => {
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
    this.tournament!.groups.forEach((group) => group.teams.sort((a, b) => a.points - b.points).reverse());
  }

  modifyTeamPoints(teamName: string, amount: number): void {
    this.tournament!.groups = this.tournament!.groups.map((group) => {
      return {
        ...group,
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

  hasTournamentStarted(): boolean {
    return isAfter(new Date(), this.tournament!.startingDate);
  }

  private initializeTodaysGames() {
    //TODO: currently uses isSameDay for testing purposes before tournament starts, change to isToday later
    this.gamesToday = this.tournament!.groups.flatMap((group) => group.matches).filter((match) => isSameDay(match.date, new Date('2022-11-21T19:00:00')));
    this.gamesToday.sort((a, b) => {
      if (isBefore(a.date, b.date)) {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
