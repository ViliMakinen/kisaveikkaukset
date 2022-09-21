import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TournamentWithGroups} from "./constants";
import {delay} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private http: HttpClient) {
  }

  getTournament() {
    return this.http.get<TournamentWithGroups[]>('api').pipe(delay(1000));
  }
}
