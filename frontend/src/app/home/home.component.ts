import { Component, OnDestroy } from '@angular/core';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, isAfter, isBefore, isSameDay } from 'date-fns';
import { countries, Country, Match, MatchResult, MockUser, Tournament } from '../constants';
import { UserService } from '../user.service';
import { Observable, Subscription } from 'rxjs';
import { TournamentService } from '../tournament.service';
import { User } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  currentUser: Partial<User> | null = this.userService.user;
  userPredictions: MatchResult[] = [];
  tournament$: Observable<Tournament> = this.tournamentService.getTournamentById(1);
  tournament: Tournament | null = null;
  results: MatchResult[] | null = null;
  matches: Match[] = [];
  mockUsers$: Observable<MockUser[]> = this.userService.getUsers();
  tournamentSubscription: Subscription;

  today = new Date();
  gamesToday: Match[] = [];
  countries: Country[] = [];

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  constructor(public userService: UserService, private tournamentService: TournamentService) {
    this.tournamentSubscription = this.tournament$.subscribe((tournament) => {
      this.tournament = tournament;
      this.matches = this.tournament.groups.flatMap((group) => group.matches);
      this.results = this.matches.map((match) => {
        return {
          id: match.id,
          result: match.result,
        };
      });
      this.countries = countries;
      this.initializeEverything();
      this.startCountdown();
      this.calculateCountdownValues();
    });
  }

  fetchFlag(teamName: string): string {
    const check = this.countries.find((team) => team.name === teamName);
    if (check) {
      return check.id;
    } else {
      return '';
    }
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
      this.userPredictions = this.matches.map((match) => {
        return { id: match.id, result: null };
      });
    }
  }

  calculateUserPoints(): void {
    this.matches.forEach((match) => {
      if (this.results![match.id - 1].result === this.userPredictions[match.id - 1].result && this.userPredictions[match.id - 1].result !== null) {
        this.userService.points++;
      }
    });
  }

  initializeResults(): void {
    this.results?.forEach((matchResult) => {
      const match = this.matches.find((match) => match.id === matchResult.id)!;
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
