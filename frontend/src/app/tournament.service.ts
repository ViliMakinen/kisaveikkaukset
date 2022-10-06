import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TournamentWithResults } from './constants';
import { map, Observable } from 'rxjs';

function parseTournament(tournamentWithResults: TournamentWithResults): TournamentWithResults {
  return {
    ...tournamentWithResults,
    tournament: {
      ...tournamentWithResults.tournament,
      startingDate: new Date(tournamentWithResults.tournament.startingDate),
      groups: tournamentWithResults.tournament.groups.map((group) => {
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
    },
  };
}

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  constructor(private http: HttpClient) {
  }

  getTournamentById(id: number): Observable<TournamentWithResults> {
    return this.http.get<TournamentWithResults>(`api/tournaments/${id}`).pipe(map((tournamentWithResults) => parseTournament(tournamentWithResults)));
  }
}
