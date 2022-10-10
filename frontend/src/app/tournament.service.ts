import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tournament } from './constants';
import { map, Observable } from 'rxjs';

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
    return this.http.get<Tournament>(`api/tournaments/${id}`).pipe(map((Tournament) => parseTournament(Tournament)));
  }
}
