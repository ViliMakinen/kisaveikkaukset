export interface Tournament {
  name: string;
  groups: Group[];
  startingDate: Date;
  extraPredictions: ExtraPredictions;
  playoffMatches: Match[];
}

export interface PlayerGroup {
  name: string;
  code: string;
  tournamentId: number;
  id: number;
  users: GroupUser[];
}

export interface GroupUser {
  firstName: string;
  lastName: string;
  predictions: Predictions;
}

export interface TournamentWithId {
  id: number;
  tournamentData: Tournament;
  lastUpdated: Date | null;
}

export interface Group {
  name: string;
  matches: Match[];
  teams: Team[];
}

export interface Predictions {
  matchPredictions: MatchResult[];
  extraPredictions: ExtraPredictions;
  playoffPredictions?: MatchResult[];
}

export interface ExtraPredictions {
  mostCards: string;
  topFour: string[];
  mostGoals: string;
  fastestGoal: number | null;
  highestScoring: number | null;
  headToHead: HeadToHead[];
}

export interface HeadToHead {
  winner: string | null;
  contestants: string[];
  type: 'goal' | 'pass' | 'winner';
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  nickName: string | null;
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
