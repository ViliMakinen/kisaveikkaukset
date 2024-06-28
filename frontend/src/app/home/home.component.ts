import { Component, Inject, LOCALE_ID, OnDestroy } from '@angular/core';
import {
  addDays,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  isAfter,
  isBefore,
  isSameDay,
  subDays,
} from 'date-fns';
import {
  countries,
  Country,
  GroupUser,
  GroupUserWithPoints,
  Match,
  MatchResult,
  PlayerGroup,
  PlayoffMatch,
  Tournament,
  TournamentWithId,
} from '../constants';
import { UserService } from '../user.service';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { TournamentService } from '../tournament.service';
import { GroupService } from '../group.service';
import { ActivatedRoute } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { InformationDialogComponent } from '../information-dialog/information-dialog.component';
import { CustomMsgDialogComponent } from '../custom-msg-dialog/custom-msg-dialog.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  currentUser: GroupUser | null = null;
  tournament$!: Observable<TournamentWithId>;
  tournament: Tournament | null = null;
  results: MatchResult[] | null = null;
  matches: Match[] = [];
  group$: Observable<PlayerGroup>;
  group: PlayerGroup | null = null;
  users: GroupUserWithPoints[] = [];
  usersPreviously: GroupUserWithPoints[] = [];
  groupCode: string[] = [];
  lastUpdated: Date | null = null;
  tournamentSubscription!: Subscription;
  groupSubscription: Subscription;
  playoffMatches: PlayoffMatch[] = [];
  userPlayoffMatches: Match[] = [];

  placeholderDate = new Date();
  gamesToday: (Match | PlayoffMatch)[] = [];
  playoffGamesToday: PlayoffMatch[] = [];
  countries: Country[] = [];

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  isUserListExpanded = false;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private clipboard: Clipboard,
    public userService: UserService,
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
    private groupService: GroupService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    const groupId$ = this.route.params.pipe(map((params) => parseInt(params['groupId'], 10)));
    this.group$ = groupId$.pipe(switchMap((groupId) => this.groupService.getGroupById(groupId)));
    this.groupSubscription = this.group$.subscribe((group) => {
      this.group = group;
      this.groupCode = group.code.split('');
      this.tournament$ = groupId$.pipe(switchMap(() => this.tournamentService.getTournamentById(group.tournamentId)));
      this.tournamentSubscription = this.tournament$.subscribe((tournament) => {
        this.tournament = tournament.tournamentData;
        this.lastUpdated = tournament.lastUpdated;
        this.playoffMatches = tournament.tournamentData.playoffMatches;
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
        this.currentUser = this.group!.users.find((user) => user.id === this.userService.user.id)!;
        this.users = this.sortUsers(group.users);
        this.usersPreviously = this.sortUsersPreviously(group.users);
        this.initializeUserMatchesWithResults();
      });
    });
  }

  openCustomDialog(text: string): void {
    this.dialog.open(CustomMsgDialogComponent, {
      width: '300px',
      data: text,
    });
  }

  openDialog(): void {
    this.dialog.open(InformationDialogComponent, {
      width: '330px',
    });
  }

  fetchFlag(teamName: string): string {
    const check = this.countries.find((team) => team.name === teamName);
    if (check) {
      return check.id;
    } else {
      return 'fi';
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
    this.initializeTodaysGames();
    this.initializeResults();
  }

  calculateUserPoints(user: GroupUser): number {
    if (user.predictions.matchPredictions === undefined) {
      return 0;
    }
    let points: number = 0;
    points += this.calculateMatchPoints(user);
    points += this.calculateHeadToHeadAndTopFourPoints(user);
    points += this.calculateExtraPredictionPoints(user);
    return points;
  }

  calculatePreviousPoints(user: GroupUser): number {
    if (user.predictions.matchPredictions === undefined) {
      return 0;
    }
    let points: number = 0;
    points += this.calculatePoints24hoursAgo(user);
    return points;
  }

  calculateExtraPredictionPoints(user: GroupUser): number {
    let points = 0;
    if (
      user.predictions.extraPredictions.fastestGoal === this.tournament!.extraPredictions.fastestGoal &&
      this.tournament!.extraPredictions.fastestGoal !== null
    ) {
      points += 2;
    }
    if (
      user.predictions.extraPredictions.highestScoring === this.tournament!.extraPredictions.highestScoring &&
      this.tournament!.extraPredictions.highestScoring !== null
    ) {
      points += 2;
    }
    if (
      user.predictions.extraPredictions.mostCards === this.tournament!.extraPredictions.mostCards &&
      this.tournament!.extraPredictions.mostCards !== ''
    ) {
      points += 3;
    }
    if (
      user.predictions.extraPredictions.mostGoals === this.tournament!.extraPredictions.mostGoals &&
      this.tournament!.extraPredictions.mostGoals !== ''
    ) {
      points += 3;
    }
    return points;
  }

  calculatePoints24hoursAgo(user: GroupUser): number {
    let points: number = 0;
    const matchesWithoutPast24hours = this.matches.filter((match) =>
      isBefore(match.date, subDays(this.lastUpdated!, 1)),
    );
    matchesWithoutPast24hours.forEach((match) => {
      if (user.predictions.matchPredictions[match.id - 1]) {
        if (
          this.results![match.id - 1].result === user.predictions.matchPredictions[match.id - 1].result &&
          user.predictions.matchPredictions[match.id - 1].result !== null
        ) {
          points++;
        }
      }
    });
    return points;
  }

  compareUserPosition(user: GroupUserWithPoints): number {
    const indexNow = this.users.findIndex((player) => player.id === user.id);
    const indexThen = this.usersPreviously.findIndex((player) => player.id === user.id);
    if (indexNow > indexThen) {
      return indexThen - indexNow;
    } else if (indexNow < indexThen) {
      return indexThen - indexNow;
    }
    return 0;
  }

  calculateMatchPoints(user: GroupUser): number {
    let points: number = 0;
    this.matches.forEach((match) => {
      if (user.predictions.matchPredictions[match.id - 1]) {
        if (
          this.results![match.id - 1].result === user.predictions.matchPredictions[match.id - 1].result &&
          user.predictions.matchPredictions[match.id - 1].result !== null
        ) {
          points++;
        }
      }
    });
    return points;
  }

  calculateHeadToHeadAndTopFourPoints(user: GroupUser): number {
    let points = 0;
    user.predictions.extraPredictions.headToHead.forEach((prediction, index) => {
      if (
        (prediction.winner === this.tournament!.extraPredictions.headToHead[index].winner &&
          this.tournament!.extraPredictions.headToHead[index].winner !== null) ||
        (this.tournament!.extraPredictions.headToHead[index].winner === 'Tasapeli' && prediction.winner !== null)
      ) {
        points++;
      }
    });
    user.predictions.extraPredictions.topFour.forEach((team) => {
      if (
        this.tournament!.extraPredictions.topFour.includes(team) &&
        this.tournament!.extraPredictions.topFour.length > 0
      ) {
        points += 2;
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
        playoffPoints: this.calculateUserPlayoffPoints(user),
      };
    });
    usersWithPoints.sort((a, b) => a.points - b.points).reverse();
    return usersWithPoints;
  }

  sortUsersPreviously(users: GroupUser[]): GroupUserWithPoints[] {
    const usersWithPoints = users.map((user) => {
      return {
        ...user,
        points: this.calculatePreviousPoints(user),
        playoffPoints: 0,
      };
    });
    usersWithPoints.sort((a, b) => a.points - b.points).reverse();
    return usersWithPoints;
  }

  hasTournamentStarted(): boolean {
    return isAfter(new Date(), this.tournament!.startingDate);
  }

  checkResultForPlayoffs(game: PlayoffMatch): string {
    const gamesIndex = this.playoffMatches.findIndex((match) => match.home === game.home && match.away === game.away);
    return this.userPlayoffMatches[gamesIndex].result === game.result ? 'done' : 'close';
  }

  copyCode(): void {
    this.clipboard.copy(this.group!.code);
    this.openSnackBar('Liittymiskoodi kopioitu leikepöydälle');
  }

  openSnackBar(message: string): void {
    this.snackbar.open(message, '', { duration: 1500 });
  }

  arePredictionsCompleted(): string {
    const predictions = this.group!.users.find((user) => user.id === this.userService.user!.id)!.predictions;
    if (predictions.matchPredictions === undefined) {
      return 'Sinulla on veikkaukset aloittamatta!';
    } else if (predictions.matchPredictions.some((match) => match.result === null)) {
      return 'Muista viimeistellä veikkauksesi!';
    }
    return 'Voit vielä muokata veikkauksiasi!';
  }

  arePlayoffPredictionsFinished(): boolean {
    const predictions = this.group!.users.find((user) => user.id === this.userService.user!.id)!.predictions;
    return !!predictions.playoffPredictions;
  }

  formatDate(lastUpdated: Date) {
    return formatDate(lastUpdated, 'dd.MM.yyyy HH.mm', this.locale);
  }

  changeDay(number: number): void {
    if (number === -1) {
      this.placeholderDate = subDays(this.placeholderDate, 1);
      this.initializeTodaysGames();
    } else {
      this.placeholderDate = addDays(this.placeholderDate, 1);
      this.initializeTodaysGames();
    }
  }

  checkResult(id: number): string {
    if (this.results![id].result === null) {
      return '';
    }
    if (
      this.currentUser!.predictions.matchPredictions[id].result !== null &&
      this.currentUser!.predictions.matchPredictions[id].result === this.results![id].result
    ) {
      return 'done';
    } else if (
      this.currentUser!.predictions.matchPredictions[id].result !== null &&
      this.currentUser!.predictions.matchPredictions[id].result !== this.results![id].result
    ) {
      return 'close';
    }
    return '';
  }

  private initializeTodaysGames(): void {
    this.playoffGamesToday = this.tournament!.playoffMatches.filter((match) => {
      return isSameDay(match.date, this.placeholderDate);
    });

    this.gamesToday = this.tournament!.groups.flatMap((group) => group.matches).filter((match) =>
      isSameDay(match.date, this.placeholderDate),
    );

    this.gamesToday.sort((a, b) => {
      if (isBefore(a.date, b.date)) {
        return -1;
      } else {
        return 1;
      }
    });

    this.playoffGamesToday.sort((a, b) => {
      if (isBefore(a.date, b.date)) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  private calculateUserPlayoffPoints(user: GroupUser) {
    if (!user.predictions.playoffPredictions) {
      return 0;
    }
    const { leftSide, rightSide, grandFinal } = this.currentUser!.predictions.playoffPredictions;

    this.userPlayoffMatches = [
      ...(leftSide?.quarterFinals || []),
      ...(leftSide?.semiFinals || []),
      leftSide?.bracketFinal || {},
      ...(rightSide?.quarterFinals || []),
      ...(rightSide?.semiFinals || []),
      rightSide?.bracketFinal || {},
      grandFinal || {},
    ];

    let points: number = 0;
    const semis = [4, 5, 11, 12];
    const bracketFinals = [6, 13];
    this.userPlayoffMatches.forEach((match: Match, index: number) => {
      if (semis.includes(index)) {
        if (match.home === this.playoffMatches[index].home || match.home === this.playoffMatches[index].away) {
          points++;
        }
        if (match.away === this.playoffMatches[index].home || match.away === this.playoffMatches[index].away) {
          points++;
        }
      }
      if (bracketFinals.includes(index)) {
        if (match.home === this.playoffMatches[index].home || match.home === this.playoffMatches[index].away) {
          points++;
        }
        if (match.away === this.playoffMatches[index].home || match.away === this.playoffMatches[index].away) {
          points++;
        }
      }
      if (index === 14) {
        if (match.home === this.playoffMatches[index].home || match.home === this.playoffMatches[index].away) {
          points++;
        }
        if (match.away === this.playoffMatches[index].home || match.away === this.playoffMatches[index].away) {
          points++;
        }
        if (user.predictions.playoffPredictions.winner === this.playoffMatches[index].result) {
          points++;
        }
      }
    });

    return points;
  }

  determineWinner(game: Match | PlayoffMatch) {
    if (game.result === game.home) {
      return '1';
    }
    return '2';
  }

  private initializeUserMatchesWithResults() {
    const { leftSide, rightSide, grandFinal } = this.currentUser!.predictions.playoffPredictions;

    const newArray = [
      ...(leftSide?.quarterFinals || []),
      ...(leftSide?.semiFinals || []),
      leftSide?.bracketFinal || {},
      ...(rightSide?.quarterFinals || []),
      ...(rightSide?.semiFinals || []),
      rightSide?.bracketFinal || {},
      grandFinal || {},
    ];

    this.userPlayoffMatches = newArray.map((match, index, matches) => {
      if (index === 0 || index === 1) {
        const homeWins = matches[4].home === match.home || matches[4].away === match.home;
        return {
          ...match,
          result: homeWins ? match.home : match.away,
        };
      } else if (index === 2 || index === 3) {
        const homeWins = matches[5].home === match.home || matches[5].away === match.home;
        return {
          ...match,
          result: homeWins ? match.home : match.away,
        };
      } else if (index === 4 || index === 5) {
        const homeWins = matches[6].home === match.home || matches[6].away === match.home;
        return {
          ...match,
          result: homeWins ? match.home : match.away,
        };
      } else if (index === 6 || index === 13) {
        const homeWins = matches[14].home === match.home || matches[14].away === match.home;
        return {
          ...match,
          result: homeWins ? match.home : match.away,
        };
      } else if (index === 7 || index === 8) {
        const homeWins = matches[11].home === match.home || matches[11].away === match.home;
        return {
          ...match,
          result: homeWins ? match.home : match.away,
        };
      } else if (index === 9 || index === 10) {
        const homeWins = matches[12].home === match.home || matches[12].away === match.home;
        return {
          ...match,
          result: homeWins ? match.home : match.away,
        };
      } else if (index === 11 || index === 12) {
        const homeWins = matches[13].home === match.home || matches[13].away === match.home;
        return {
          ...match,
          result: homeWins ? match.home : match.away,
        };
      } else {
        const homeWins = this.currentUser?.predictions.playoffPredictions.winner === match.home;
        return {
          ...match,
          result: homeWins ? match.home : match.away,
        };
      }
    });
  }
}
