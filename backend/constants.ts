export interface Tournament {
  name: string;
  groups: Group[];
  startingDate: Date;
}

export interface PlayerGroup {
  name: string;
  code: string;
  tournamentId: number;
  groupId: number;
  users: GroupUser[];
}

export interface GroupUser {
  firstName: string;
  lastName: string;
  predictions: MatchResult[];
}

export interface TournamentWithId {
  id: number;
  tournamentData: Tournament;
}

export interface Group {
  name: string;
  matches: Match[];
  teams: Team[];
}

export interface GroupWithIdAndName {
  groupId: number;
  groupName: string;
}

export interface Match {
  home: string;
  away: string;
  date: Date;
  id: number;
  result: Result;
}

export interface MatchResult {
  id: number;
  result: Result;
}

export type Result = '1' | 'X' | '2' | null;

export interface Team {
  name: string;
  points: number;
  predictedPoints: number;
}