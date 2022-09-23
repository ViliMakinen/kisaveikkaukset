import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TournamentWithGroups } from './constants';
import { delay, map } from 'rxjs';

function parseTournament(tournament: TournamentWithGroups): TournamentWithGroups {
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

  getTournament() {
    return this.http.get<TournamentWithGroups>('api/tournaments').pipe(
      delay(1000),
      map((tournament) => parseTournament(tournament)),
    );
  }
}
