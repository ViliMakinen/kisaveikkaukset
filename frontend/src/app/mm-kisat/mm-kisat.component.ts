import { UserService } from '../user.service';
import { Component, OnDestroy } from '@angular/core';
import {
  countries,
  Country,
  emptyExtraPredictions,
  HeadToHead,
  Match,
  MatchResult,
  PlayerGroup,
  Predictions,
  Result,
  Team,
  Tournament,
  TournamentWithId,
} from '../constants';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { TournamentService } from '../tournament.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../group.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isBefore } from 'date-fns';

@Component({
  selector: 'app-mm-kisat',
  templateUrl: './mm-kisat.component.html',
  styleUrls: ['./mm-kisat.component.scss'],
})
export class MmKisatComponent implements OnDestroy {
  userPredictions: Predictions = {
    matchPredictions: [],
    extraPredictions: emptyExtraPredictions,
  };
  tournament$!: Observable<TournamentWithId>;
  tournament: Tournament | null = null;
  lastUpdated: Date | null = null;
  group$: Observable<PlayerGroup>;
  group: PlayerGroup | null = null;
  results: MatchResult[] = [];
  teams: Team[] = [];
  matches: Match[] = [];
  countries: Country[] = [];

  groupSubscription: Subscription;
  tournamentSubscription!: Subscription;

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    public userService: UserService,
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
    private groupService: GroupService,
  ) {
    const groupId$ = this.route.params.pipe(map((params) => parseInt(params['groupId'], 10)));
    this.group$ = groupId$.pipe(switchMap((groupId) => this.groupService.getGroupById(groupId)));
    this.groupSubscription = this.group$.subscribe((group) => {
      this.group = group;
      this.tournament$ = groupId$.pipe(switchMap(() => this.tournamentService.getTournamentById(group.tournamentId)));
      this.tournamentSubscription = this.tournament$.subscribe((tournament) => {
        this.tournament = tournament.tournamentData;
        this.lastUpdated = tournament.lastUpdated;
        this.matches = this.tournament.groups.flatMap((group) => group.matches);
        this.results = this.matches.map((match) => {
          return {
            id: match.id,
            result: match.result,
          };
        });
        this.countries = countries;
        this.initializeUserPredictions();
        this.teams = this.tournament.groups
          .flatMap((group) => group.teams)
          .sort((a, b) => a.name.localeCompare(b.name));
      });
    });
  }

  formatLabelMatch(value: number): string {
    if (value === 0) {
      return 'Valitse aikaväli';
    }
    if (value === 6) {
      return '05:00+';
    }
    return '0' + (value - 1) + ':00 - 0' + (value - 1) + ':59';
  }

  formatLabelScore(value: number): string {
    if (value === 2) {
      return 'Valitse maalimäärä';
    } else if (value === 4) {
      return '0-4';
    } else if (value === 6) {
      return '5-6';
    } else if (value === 8) {
      return '7-8';
    } else if (value === 10) {
      return '9-10';
    }
    return '11+';
  }

  ngOnDestroy(): void {
    this.tournamentSubscription.unsubscribe();
  }

  fetchFlag(teamName: string): string {
    const index = this.countries.findIndex((country) => country.name === teamName);
    if (index !== -1) {
      return this.countries[index].id;
    } else {
      return '';
    }
  }

  initializeUserPredictions(): void {
    const currentUser = this.group!.users.find((user) => user.id === this.userService.user.id)!;
    if (currentUser.predictions.matchPredictions) {
      this.userPredictions.matchPredictions = currentUser.predictions.matchPredictions;
      this.userPredictions.extraPredictions = currentUser.predictions.extraPredictions;
    } else {
      this.userPredictions.matchPredictions = this.matches.map((match) => {
        return { id: match.id, result: null };
      });
    }
    this.updatePredictedPoints();
  }

  top4CorrectAmount(): number {
    return this.userPredictions.extraPredictions.topFour.filter((team) =>
      this.tournament!.extraPredictions.topFour.includes(team),
    ).length;
  }

  updatePredictedPoints(): void {
    this.emptyPredictedPoints();
    this.userPredictions.matchPredictions.forEach((matchResult) => {
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
    this.tournament!.groups.forEach((group) =>
      group.teams.sort((a, b) => a.predictedPoints - b.predictedPoints).reverse(),
    );
  }

  modifyTeamPoints(teamName: string, amount: number): void {
    this.tournament!.groups = this.tournament!.groups.map((group) => {
      return {
        ...group,
        teams: group.teams.map((team) => {
          if (team.name === teamName) {
            return { ...team, predictedPoints: team.predictedPoints + amount };
          }
          return { ...team };
        }),
      };
    });
  }

  savePrediction(id: number, result: Result): void {
    this.userPredictions.matchPredictions.find((result) => result.id === id)!.result = result;
    this.updatePredictedPoints();
  }

  saveHeadToHeadPrediction(result: string, index: number): void {
    this.userPredictions.extraPredictions.headToHead[index].winner = result;
  }

  savePredictions(): void {
    this.userService.updatePredictions(this.userPredictions, this.group!.id).subscribe(
      () => {
        this.openSnackBar('Veikkaukset tallennettu kantaan!');
        this.router.navigate(['overview/', this.group!.id]);
      },
      (error) => {
        console.log(error);
        this.openSnackBar('Jotain meni vikaan');
      },
    );
  }

  openSnackBar(message: string): void {
    this.snackbar.open(message, '', { duration: 2000 });
  }

  isSelected(id: number): Result {
    const index = this.userPredictions.matchPredictions.findIndex((result) => result.id === id);
    return this.userPredictions.matchPredictions[index].result;
  }

  isSelectedH2H(i: number): string {
    const winner = this.userPredictions.extraPredictions.headToHead[i].winner;
    if (winner) {
      return winner;
    }
    return '';
  }

  arePredictionsCorrect(id: number, value: Result): string {
    const index = this.userPredictions.matchPredictions.findIndex((result) => result.id === id);
    if (this.results[index].result === null) {
      return '';
    } else if (
      this.results[index].result === this.userPredictions.matchPredictions[index].result &&
      this.userPredictions.matchPredictions[index].result === value
    ) {
      return '#228B22';
    } else if (
      this.results[index].result !== this.userPredictions.matchPredictions[index].result &&
      this.userPredictions.matchPredictions[index].result === value
    ) {
      return '#CE2029';
    } else {
      return '';
    }
  }

  private emptyPredictedPoints(): void {
    this.tournament!.groups = this.tournament!.groups.map((group) => {
      return {
        ...group,
        teams: group.teams.map((team) => {
          return { ...team, predictedPoints: 0 };
        }),
      };
    });
  }

  arePredictionsLocked(): boolean {
    if (this.lastUpdated) {
      return isBefore(this.tournament!.startingDate, this.lastUpdated);
    }
    return false;
  }

  backToTop(mainContent: HTMLElement): void {
    mainContent.scrollIntoView({ behavior: 'smooth' });
  }

  getMatchUpType(matchUp: HeadToHead): string {
    if (matchUp.type === 'goal') {
      return 'Tekee enemmän maaleja';
    } else if (matchUp.type === 'winner') {
      return 'Pääsee pidemmälle';
    }
    return 'Syöttää enemmän maaleja';
  }

  areHeadToHeadPredictionsCorrect(i: number, team: string): string {
    if (
      this.userPredictions.extraPredictions.headToHead[i].winner === team &&
      this.tournament!.extraPredictions.headToHead[i].winner === team &&
      this.tournament!.extraPredictions.headToHead[i].winner !== null
    ) {
      return '#42FF5A';
    } else if (
      this.userPredictions.extraPredictions.headToHead[i].winner === team &&
      this.tournament!.extraPredictions.headToHead[i].winner !== team &&
      this.tournament!.extraPredictions.headToHead[i].winner !== null
    ) {
      return 'red';
    }
    return '';
  }
}
