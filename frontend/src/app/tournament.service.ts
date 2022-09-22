import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TournamentWithGroups} from "./constants";
import {delay, map} from "rxjs";

function parseTournament(tournament: TournamentWithGroups): TournamentWithGroups {
  tournament.groups.flatMap(group => group.matches).forEach(match => match.date = new Date(match.date))
  return {
    ...tournament, startingDate: new Date(tournament.startingDate),
  };
}

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private http: HttpClient) {
  }

  getTournament() {
    return this.http.get<TournamentWithGroups>('api/tournament').pipe(delay(1000), map(tournament => parseTournament(tournament)));
  }
}
