import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tournament, TournamentWithId } from './constants';
import { map, Observable } from 'rxjs';

function parseTournaments(tournaments: TournamentWithId[]): TournamentWithId[] {
  return tournaments.map((tournament) => {
    return {
      ...tournament,
      lastUpdated: tournament.lastUpdated ? new Date(tournament.lastUpdated) : null,
      tournamentData: parseTournament(tournament.tournamentData),
    };
  });
}

function parseTournamentWithId(tournament: TournamentWithId): TournamentWithId {
  return {
    ...tournament,
    lastUpdated: tournament.lastUpdated ? new Date(tournament.lastUpdated) : null,
    tournamentData: parseTournament(tournament.tournamentData),
  };
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
    playoffMatches: tournament.playoffMatches?.map((match) => {
      return {
        ...match,
        date: new Date(match.date),
      };
    }),
  };
}

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  constructor(private http: HttpClient) {}

  getTournamentById(id: number): Observable<TournamentWithId> {
    return this.http
      .get<TournamentWithId>(`api/tournaments/${id}`)
      .pipe(map((tournament) => parseTournamentWithId(tournament)));
  }

  getAllTournaments(): Observable<TournamentWithId[]> {
    return this.http.get<TournamentWithId[]>('api/tournaments').pipe(map((tournament) => parseTournaments(tournament)));
  }

  updateTournamentResults(tournament: TournamentWithId): Observable<TournamentWithId> {
    return this.http
      .post<TournamentWithId>('api/tournaments', tournament)
      .pipe(map((tournament) => parseTournamentWithId(tournament)));
  }

  savePlayoffPredictions(predictions: any, groupId: number) {
    return this.http.post('api/tournaments/playoff-predictions', { predictions, groupId });
  }
}
