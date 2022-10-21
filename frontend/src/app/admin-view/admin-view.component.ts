import { Component } from '@angular/core';
import { Match, MatchResult, Result, TournamentWithId } from '../constants';
import { UserService } from '../user.service';
import { isBefore } from 'date-fns';
import { Observable } from 'rxjs';
import { TournamentService } from '../tournament.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
})
export class AdminViewComponent {
  results: MatchResult[] = [];
  allTournaments$: Observable<TournamentWithId[]> = this.tournamentService.getAllTournaments();
  tournaments: TournamentWithId[] | null = null;
  tournament: TournamentWithId | null = null;
  matches: Match[] = [];

  constructor(
    public userService: UserService,
    private tournamentService: TournamentService,
    private snackBar: MatSnackBar,
    public router: ActivatedRoute,
  ) {
    this.allTournaments$.subscribe((tournaments) => {
      this.tournaments = tournaments;
    });
  }

  selectTournament(id: number): any {
    this.tournament = this.tournaments!.find((tournament) => tournament.id === id)!;
    this.initializeTournament();
  }

  updateResult(id: number, result: Result): void {
    this.tournament!.tournamentData.groups.forEach((group) => {
      group.matches.forEach((match) => {
        if (match.id === id) {
          match.result = result;
        }
      });
    });
  }

  emptyResults(): void {
    this.tournament = {
      ...this.tournament!,
      tournamentData: {
        ...this.tournament!.tournamentData,
        groups: this.tournament!.tournamentData.groups.map((group) => {
          return {
            ...group,
            matches: group.matches.map((match) => {
              return {
                ...match,
                result: null,
              };
            }),
          };
        }),
      },
    };
    this.tournamentService.updateTournamentResults(this.tournament!).subscribe((tournament) => {
      this.tournament = tournament;
      this.initializeTournament();
      this.openSnackBar('Kannan tulokset nollattu');
    });
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, '', { duration: 1500 });
  }

  saveResults(): void {
    this.tournament!.lastUpdated = new Date();
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

  initializeTournament(): void {
    this.matches = this.tournament!.tournamentData.groups.flatMap((group) => group.matches);
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
  }
}
