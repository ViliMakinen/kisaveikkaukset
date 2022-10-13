import { Component } from '@angular/core';
import { Match, MatchResult, Result, Tournament } from '../constants';
import { UserService } from '../user.service';
import { isBefore } from 'date-fns';
import { Observable } from 'rxjs';
import { TournamentService } from '../tournament.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
})
export class AdminViewComponent {
  results: MatchResult[] = [];
  tournament$: Observable<Tournament> = this.tournamentService.getTournamentById(2);
  tournament: Tournament | null = null;
  matches: Match[] = [];

  constructor(public userService: UserService, private tournamentService: TournamentService, private snackBar: MatSnackBar) {
    this.tournament$.subscribe((tournament) => {
      this.tournament = tournament;
      this.matches = this.tournament.groups.flatMap((group) => group.matches);
      this.results = this.matches.map((match) => {
        return {
          id: match.id,
          result: match.result,
        };
      });
      this.matches.sort((a, b) => {
        if (isBefore(a.date, b.date)) {
          return -1;
        } else {
          return 1;
        }
      });
    });
  }

  updateResult(id: number, result: Result): void {
    this.tournament!.groups.forEach((group) => {
      group.matches.forEach((match) => {
        if (match.id === id) {
          match.result = result;
        }
      });
    });
  }

  emptyResults(): void {
    this.tournament!.groups.forEach((group) => {
      group.matches.forEach((match) => (match.result = null));
    });
    this.tournamentService.updateTournamentResults(this.tournament!).subscribe((tournament) => {
      this.tournament = tournament;
      this.openSnackBar('Kannan tulokset nollattu');
    });
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, '', { duration: 1500 });
  }

  saveResults(): void {
    this.tournamentService.updateTournamentResults(this.tournament!).subscribe((tournament) => {
      this.tournament = tournament;
      this.openSnackBar('Tulokset tallennettu kantaan');
    });
  }

  findResult(id: number): Result | null {
    const match = this.results.find((result) => result.id === id);
    if (match) {
      return match.result;
    }
    return null;
  }
}
