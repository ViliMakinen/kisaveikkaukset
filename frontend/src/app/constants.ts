export interface Tournament {
  name: string;
  groups: Group[];
  startingDate: Date;
}

export interface UserExtraPredictions {
  mostCards: string;
  topFour: string[];
  mostGoals: string;
  topScorer: string;
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

export interface Country {
  name: string;
  id: string;
}

export interface Team {
  name: string;
  points: number;
  predictedPoints: number;
}

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
];
