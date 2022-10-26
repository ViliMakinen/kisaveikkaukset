import { UserService } from '../user.service';
import { Component, OnDestroy } from '@angular/core';
import {
  countries,
  Country,
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
    extraPredictions: { mostGoals: '', mostCards: '', topFour: [], topScorer: '' },
  };
  tournament$!: Observable<TournamentWithId>;
  tournament: Tournament | null = null;
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
      this.tournament$ = groupId$.pipe(
        switchMap((groupId) => this.tournamentService.getTournamentById(group.tournamentId)),
      );
      this.tournamentSubscription = this.tournament$.subscribe((tournament) => {
        this.tournament = tournament.tournamentData;
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

  arePredictionsIncomplete(): boolean {
    return this.userPredictions.matchPredictions.some((result) => result.result === null);
  }

  savePrediction(id: number, result: Result): void {
    this.userPredictions.matchPredictions.find((result) => result.id === id)!.result = result;
    this.updatePredictedPoints();
  }

  lockPredictions(): void {
    this.userService.updatePredictions(this.userPredictions, this.group!.id).subscribe(
      (predictions) => {
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

  arePredictionsCorrect(id: number, value: Result): string {
    const index = this.userPredictions.matchPredictions.findIndex((result) => result.id === id);
    if (this.results[index].result === null) {
      return '';
    } else if (
      this.results[index].result === this.userPredictions.matchPredictions[index].result &&
      this.userPredictions.matchPredictions[index].result === value
    ) {
      return '#42FF5A';
    } else if (
      this.results[index].result !== this.userPredictions.matchPredictions[index].result &&
      this.userPredictions.matchPredictions[index].result === value
    ) {
      return 'red';
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
    return isBefore(this.tournament!.startingDate, new Date());
  }
}
