import { UserService } from '../user.service';
import { Component, OnDestroy } from '@angular/core';
import { Group, MatchResult, Result, Team, Tournament, TournamentWithResults } from '../constants';
import { Observable, Subscription } from 'rxjs';
import { TournamentService } from '../tournament.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-mm-kisat',
  templateUrl: './mm-kisat.component.html',
  styleUrls: ['./mm-kisat.component.scss'],
})
export class MmKisatComponent implements OnDestroy {
  userPredictions: MatchResult[] = [];
  tournamentWithResults$: Observable<TournamentWithResults> = this.tournamentService.getTournament();
  tournament: Tournament | null = null;
  results: MatchResult[] = [];
  groups: Group[] = [];
  teams: Team[] = [];
  topFour: string[] = [];
  topScorer: string = '';

  private tournamentSubscription: Subscription;
  isLinear = true;

  constructor(public userService: UserService, private tournamentService: TournamentService, private _formBuilder: FormBuilder) {
    this.tournamentSubscription = this.tournamentWithResults$.subscribe((tournamentWithResults) => {
      this.tournament = tournamentWithResults.tournament;
      this.results = tournamentWithResults.results;
      this.groups = tournamentWithResults.tournament.groups;
      this.initializeUserPredictions();
      this.teams = this.tournament.groups.flatMap((group) => group.teams).sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  ngOnDestroy(): void {
    this.tournamentSubscription.unsubscribe();
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
    this.updateUserPredictions();
  }

  updateUserPredictions(): void {
    const matches = this.tournament!.groups.flatMap((group) => group.matches);

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
    this.tournament!.groups.forEach((group) => group.teams.sort((a, b) => a.predictedPoints - b.predictedPoints).reverse());
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
    this.tournament!.groups = this.tournament!.groups.map((group) => {
      return {
        ...group,
        teams: group.teams.map((team) => {
          return { ...team, predictedPoints: 0 };
        }),
      };
    });
  }

  ploo() {
    console.log(this.topFour, this.topScorer);
  }
}
