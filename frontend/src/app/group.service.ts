import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private http: HttpClient) {}

  getAllGroups(): Observable<any> {
    return this.http.get<any>('api/groups');
  }

  createNewGroup(groupName: string, tournamentId: number) {
    return this.http.post<any>('api/groups', {
      groupName,
      tournamentId,
    });
  }
}
