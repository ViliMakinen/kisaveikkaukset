export interface Tournament {
  name: string;
  groups: Group[];
  startingDate: Date;
  extraPredictions: ExtraPredictions;
  playoffMatches: PlayoffMatch[];
}

export interface PlayoffMatch {
  home: string;
  away: string;
  date: Date;
  id: number;
  result: string;
}

export interface PlayerGroup {
  name: string;
  code: string;
  tournamentId: number;
  id: number;
  users: GroupUser[];
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
}

export interface GroupUser {
  firstName: string;
  lastName: string;
  nickName: string | null;
  id: number;
  predictions: Predictions;
}

export interface Predictions {
  matchPredictions: MatchResult[];
  extraPredictions: ExtraPredictions;
  playoffPredictions: any;
}

export interface GroupUserWithPoints extends GroupUser {
  points: number;
  playoffPoints: number;
}

export interface TournamentWithId {
  id: number;
  tournamentData: Tournament;
  lastUpdated: Date | null;
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

export interface MatchWithPredictions extends Match {
  predictedResults: [number, number, number];
}

export interface MatchResult {
  id: number;
  result: Result;
}

export type Result = '1' | 'X' | '2' | null;

export interface Country {
  name: string;
  id: string;
}

export interface Team {
  name: string;
  points: number;
  predictedPoints: number;
}

export const emptyExtraPredictions: ExtraPredictions = {
  mostGoals: '',
  topFour: [],
  mostCards: '',
  fastestGoal: null,
  highestScoring: null,
  headToHead: [
    {
      contestants: ['Espanja', 'Saksa'],
      winner: null,
      type: 'winner',
    },
    {
      contestants: ['Ranska', 'Englanti'],
      winner: null,
      type: 'winner',
    },
    {
      contestants: ['Kane', 'Mbappé'],
      winner: null,
      type: 'goal',
    },
    {
      contestants: ['Griezmann', 'Bellingham'],
      winner: null,
      type: 'goal',
    },
    {
      contestants: ['Ronaldo', 'Foden'],
      winner: null,
      type: 'goal',
    },
    {
      contestants: ['Bruno F.', 'de Bruyne'],
      winner: null,
      type: 'pass',
    },
  ],
};

export const countries: Country[] = [
  { name: 'Qatar', id: 'qa' },
  { name: 'Brasilia', id: 'br' },
  { name: 'Belgia', id: 'be' },
  { name: 'Ranska', id: 'fr' },
  { name: 'Argentina', id: 'ar' },
  { name: 'Englanti', id: 'gb-eng' },
  { name: 'Portugali', id: 'pt' },
  { name: 'Espanja', id: 'es' },
  { name: 'Meksiko', id: 'mx' },
  { name: 'Hollanti', id: 'nl' },
  { name: 'Tanska', id: 'dk' },
  { name: 'Saksa', id: 'de' },
  { name: 'Uruguay', id: 'uy' },
  { name: 'Sveitsi', id: 'ch' },
  { name: 'Usa', id: 'us' },
  { name: 'Kroatia', id: 'hr' },
  { name: 'Senegal', id: 'sn' },
  { name: 'Iran', id: 'ir' },
  { name: 'Japani', id: 'jp' },
  { name: 'Marokko', id: 'ma' },
  { name: 'Serbia', id: 'rs' },
  { name: 'Puola', id: 'pl' },
  { name: 'Etelä-Korea', id: 'kr' },
  { name: 'Tunisia', id: 'tn' },
  { name: 'Kamerun', id: 'cm' },
  { name: 'Kanada', id: 'ca' },
  { name: 'Ecuador', id: 'ec' },
  { name: 'Saudi Arabia', id: 'sa' },
  { name: 'Ghana', id: 'gh' },
  { name: 'Wales', id: 'gb-wls' },
  { name: 'Australia', id: 'au' },
  { name: 'Costa Rica', id: 'cr' },
  { name: 'Unkari', id: 'hu' },
  { name: 'Skotlanti', id: 'gb-sct' },
  { name: 'Italia', id: 'it' },
  { name: 'Albania', id: 'al' },
  { name: 'Slovenia', id: 'si' },
  { name: 'Itävalta', id: 'at' },
  { name: 'Romania', id: 'ro' },
  { name: 'Slovakia', id: 'sk' },
  { name: 'Ukraina', id: 'ua' },
  { name: 'Turkki', id: 'tr' },
  { name: 'Georgia', id: 'ge' },
  { name: 'Tsekki', id: 'cz' },
];
