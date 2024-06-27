import { Component } from '@angular/core';
import {
  emptyExtraPredictions,
  ExtraPredictions,
  HeadToHead,
  Match,
  MatchResult,
  Result,
  Team,
  TournamentWithId,
} from '../constants';
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
  matchResults: MatchResult[] = [];
  allTournaments$: Observable<TournamentWithId[]>;
  tournaments: TournamentWithId[] | null = null;
  tournament: TournamentWithId | null = null;
  matches: Match[] = [];
  teams: Team[] = [];
  extraPredictionResults: ExtraPredictions = emptyExtraPredictions;
  playoffMatches: any;

  constructor(
    private tournamentService: TournamentService,
    private snackBar: MatSnackBar,
    public router: ActivatedRoute,
  ) {
    this.allTournaments$ = this.tournamentService.getAllTournaments();
    this.allTournaments$.subscribe((tournaments) => {
      this.tournaments = tournaments;
    });
  }

  selectTournament(id: number): any {
    this.tournament = this.tournaments!.find((tournament) => tournament.id === id)!;
    this.initializeTournament();
  }

  getMatchUpType(matchUp: HeadToHead): string {
    if (matchUp.type === 'goal') {
      return 'Tekee enemmän maaleja';
    } else if (matchUp.type === 'winner') {
      return 'Pääsee pidemmälle';
    }
    return 'Syöttää enemmän maaleja';
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
        extraPredictions: emptyExtraPredictions,
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

  findMatchResult(id: number): Result | null {
    const match = this.matchResults.find((result) => result.id === id);
    if (match) {
      return match.result;
    }
    return null;
  }

  initializeTournament(): void {
    this.extraPredictionResults = this.tournament!.tournamentData.extraPredictions;
    this.teams = this.tournament!.tournamentData.groups.flatMap((group) => group.teams);
    this.matches = this.tournament!.tournamentData.groups.flatMap((group) => group.matches);
    this.playoffMatches = this.tournament!.tournamentData.playoffMatches;
    this.matchResults = this.matches.map((match) => {
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

  saveHeadToHeadResult(result: string, i: number): void {
    this.tournament!.tournamentData.extraPredictions.headToHead[i].winner = result;
  }

  selectWinner(home: string): void {
    this.tournament!.tournamentData = {
      ...this.tournament!.tournamentData,
      playoffMatches: this.tournament!.tournamentData.playoffMatches.map((playoffMatch) => {
        if (playoffMatch.home === home) {
          return {
            ...playoffMatch,
            result: home,
          };
        }
        return playoffMatch;
      }),
    };
  }

  isSelectedPlayoffWinner(home: any, match: any) {
    return (
      this.tournament!.tournamentData.playoffMatches.find((playoffMatch) => playoffMatch.id === match.id)!.result ===
      home
    );
  }
}
