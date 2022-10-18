import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupWithIdAndName, PlayerGroup } from './constants';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private http: HttpClient) {}

  getGroupById(id: number): Observable<PlayerGroup> {
    return this.http.get<any>(`api/groups/${id}`);
  }

  createNewGroup(groupName: string, tournamentId: number): Observable<GroupWithIdAndName> {
    return this.http.post<GroupWithIdAndName>('api/groups/', {
      groupName,
      tournamentId,
    });
  }

  joinGroup(code: string) {
    return this.http.post<any>('api/code', {
      code,
    });
  }

  getUsersGroups(): Observable<GroupWithIdAndName[]> {
    return this.http.get<GroupWithIdAndName[]>('api/groups/');
  }
}
