export interface Tournament {
  name: string;
  groups: Group[];
  startingDate: Date;
}

export interface Group {
  name: string;
  matches: Match[];
  teams: Team[];
}

export interface MockUser {
  name: string;
  points: number;
  admin: boolean;
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