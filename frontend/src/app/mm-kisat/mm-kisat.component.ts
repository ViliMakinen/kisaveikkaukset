import { UserService } from '../user.service';
import { Component, OnDestroy } from '@angular/core';
import { countries, Country, Match, MatchResult, Result, Team, Tournament, UserExtraPredictions } from '../constants';
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
  tournament$: Observable<Tournament> = this.tournamentService.getTournamentById(2);
  tournament: Tournament | null = null;
  results: MatchResult[] = [];
  teams: Team[] = [];
  matches: Match[] = [];
  userExtraPredictions: UserExtraPredictions = { mostGoals: '', mostCards: '', topFour: [], topScorer: '' };
  countries: Country[] = [];

  private tournamentSubscription: Subscription;

  constructor(public userService: UserService, private tournamentService: TournamentService, private _formBuilder: FormBuilder) {
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
      this.initializeUserPredictions();
      this.initializeUserOtherPredictions();
      this.teams = this.tournament.groups.flatMap((group) => group.teams).sort((a, b) => a.name.localeCompare(b.name));
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
    if (localStorage.getItem(this.userService.user?.firstName + 'predictions')) {
      this.userPredictions = JSON.parse(localStorage.getItem(this.userService.user?.firstName + 'predictions')!);
    } else {
      this.userPredictions = this.matches.map((match) => {
        return { id: match.id, result: null };
      });
    }
    this.updateUserPredictions();
  }

  initializeUserOtherPredictions(): void {
    if (localStorage.getItem(this.userService.user?.firstName + 'extraPredictions')) {
      this.userExtraPredictions = JSON.parse(localStorage.getItem(this.userService.user?.firstName + 'extraPredictions')!);
    } else {
      this.userExtraPredictions = {
        mostGoals: '',
        mostCards: '',
        topFour: [],
        topScorer: '',
      };
    }
  }

  saveOtherPrediction(): void {
    localStorage.setItem(this.userService.user?.firstName + 'extraPredictions', JSON.stringify(this.userExtraPredictions));
  }

  updateUserPredictions(): void {
    this.userPredictions.forEach((matchResult) => {
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

  arePredictionsLocked(): boolean {
    return !(localStorage.getItem(this.userService.user?.firstName + 'extraPredictions') === null);
  }

  finalizePredictions() {
    // setter for backend to save user's predictions
    // this.userService.user.lockStatus = true;  and something like this
  }
}
