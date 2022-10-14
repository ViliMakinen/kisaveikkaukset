import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tournament, TournamentWithId } from './constants';
import { map, Observable } from 'rxjs';

function parseTournaments(tournaments: TournamentWithId[]): TournamentWithId[] {
  return tournaments.map((tournament) => {
    return {
      ...tournament,
      tournamentData: parseTournament(tournament.tournamentData),
    };
  });
}

function parseTournament(tournament: Tournament): Tournament {
  return {
    ...tournament,
    startingDate: new Date(tournament.startingDate),
    groups: tournament.groups.map((group) => {
      return {
        ...group,
        matches: group.matches.map((match) => {
          return {
            ...match,
            date: new Date(match.date),
          };
        }),
      };
    }),
  };
}

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  constructor(private http: HttpClient) {}

  getTournamentById(id: number): Observable<Tournament> {
    return this.http.get<Tournament>(`api/tournaments/${id}`).pipe(map((tournament) => parseTournament(tournament)));
  }

  getAllTournaments(): Observable<TournamentWithId[]> {
    return this.http.get<TournamentWithId[]>('api/tournaments').pipe(map((tournament) => parseTournaments(tournament)));
  }

  updateTournamentResults(tournament: Tournament): Observable<Tournament> {
    return this.http.post<Tournament>('api/tournaments', tournament).pipe(map((tournament) => parseTournament(tournament)));
  }
}
