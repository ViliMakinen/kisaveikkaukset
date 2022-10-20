import { Component, OnDestroy } from '@angular/core';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  isAfter,
  isBefore,
  isSameDay,
  isToday,
} from 'date-fns';
import {
  countries,
  Country,
  GroupUser,
  GroupUserWithPoints,
  Match,
  MatchResult,
  PlayerGroup,
  Tournament,
  User,
} from '../constants';
import { UserService } from '../user.service';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { TournamentService } from '../tournament.service';
import { GroupService } from '../group.service';
import { ActivatedRoute } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  currentUser: User | null = this.userService.user;
  userPredictions: MatchResult[] = [];
  tournament$!: Observable<Tournament>;
  tournament: Tournament | null = null;
  results: MatchResult[] | null = null;
  matches: Match[] = [];
  group$: Observable<PlayerGroup>;
  group: PlayerGroup | null = null;
  users: GroupUserWithPoints[] = [];
  groupCode: string[] = [];
  tournamentSubscription!: Subscription;
  groupSubscription: Subscription;

  today = new Date();
  gamesToday: Match[] = [];
  countries: Country[] = [];

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  constructor(
    private clipboard: Clipboard,
    public userService: UserService,
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
    private groupService: GroupService,
    private snackbar: MatSnackBar,
  ) {
    const groupId$ = this.route.params.pipe(map((params) => parseInt(params['groupId'], 10)));
    this.group$ = groupId$.pipe(switchMap((groupId) => this.groupService.getGroupById(groupId)));
    this.groupSubscription = this.group$.subscribe((group) => {
      this.group = group;
      this.users = this.sortUsers(group.users);
      this.groupCode = group.code.split('');
      this.tournament$ = groupId$.pipe(
        switchMap((groupId) => this.tournamentService.getTournamentById(group.tournamentId)),
      );
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
    this.minutes = Math.floor(
      differenceInMinutes(this.tournament!.startingDate, now) - this.days * 24 * 60 - this.hours * 60,
    );
    this.seconds = Math.floor(
      differenceInSeconds(this.tournament!.startingDate, now) -
        this.days * 24 * 60 * 60 -
        this.hours * 60 * 60 -
        this.minutes * 60,
    );
  }

  ngOnDestroy(): void {
    this.tournamentSubscription.unsubscribe();
  }

  private initializeEverything() {
    this.initializeUserPredictions();
    this.initializeTodaysGames();
    this.initializeResults();
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

  calculateUserPoints(user: GroupUser): number {
    //todo switch to reduce functionality
    let points: number = 0;
    this.matches.forEach((match) => {
      if (user.predictions[match.id - 1]) {
        if (
          this.results![match.id - 1].result === user.predictions[match.id - 1].result &&
          this.userPredictions[match.id - 1].result !== null
        ) {
          points++;
        }
      }
    });
    return points;
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

  sortUsers(users: GroupUser[]): GroupUserWithPoints[] {
    const usersWithPoints = users.map((user) => {
      return {
        ...user,
        points: this.calculateUserPoints(user),
      };
    });
    usersWithPoints.sort((a, b) => a.points - b.points).reverse();
    return usersWithPoints;
  }

  hasTournamentStarted(): boolean {
    return isAfter(new Date(), this.tournament!.startingDate);
  }

  private initializeTodaysGames() {
    this.gamesToday = this.tournament!.groups.flatMap((group) => group.matches).filter((match) => isToday(match.date));
    if (this.gamesToday.length < 1) {
      this.gamesToday = this.tournament!.groups.flatMap((group) => group.matches).filter((match) =>
        isSameDay(match.date, new Date('2022-11-19T19:00:00+02:00')),
      );
    }
    this.gamesToday.sort((a, b) => {
      if (isBefore(a.date, b.date)) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  copyCode(): void {
    this.clipboard.copy(this.group!.code);
    this.openSnackBar('Liittymiskoodi kopioitu leikepöydälle');
  }

  openSnackBar(message: string): void {
    this.snackbar.open(message, '', { duration: 1500 });
  }
}
