import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatchResult } from './constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  constructor(private http: HttpClient) {}

  getResults(): Observable<MatchResult[]> {
    return this.http.get<MatchResult[]>('api/results');
  }
}
