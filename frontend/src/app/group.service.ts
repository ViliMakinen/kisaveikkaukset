import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private http: HttpClient) {}

  getAllGroups(): Observable<any> {
    console.log('hey');
    return this.http.get<any>('api/groups').pipe(map((group) => group));
  }
}
