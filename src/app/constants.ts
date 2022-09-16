export interface TournamentWithGroups {
  name: string;
  groups: Group[];
  startingDate: Date;
}
export interface Group {
  name: string;
  matches: Match[];
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
}
export interface MatchResult {
  id: number;
  result: Result;
}
export type Result = '1' | 'X' | '2' | null;

export interface GroupStanding {
  name: string;
  teams: Team[];
}

export interface Team {
  name: string;
  points: number;
}

export interface MockGame {
  home: string;
  away: string;
  date: Date;
}

export const games: MockGame[] = [
  {
    home: 'suomi',
    away: 'ruotsi',
    date: new Date('2022-11-19T19:00:00'),
  },
  {
    home: 'suomi',
    away: 'ruotsi',
    date: new Date('2022-11-19T19:00:00'),
  },
  {
    home: 'suomi',
    away: 'ruotsi',
    date: new Date('2022-11-19T19:00:00'),
  },
  {
    home: 'suomi',
    away: 'ruotsi',
    date: new Date('2022-11-19T19:00:00'),
  },
  {
    home: 'suomi',
    away: 'ruotsi',
    date: new Date('2022-11-19T19:00:00'),
  },
  {
    home: 'suomi',
    away: 'ruotsi',
    date: new Date('2022-11-19T19:00:00'),
  },
];

export const users: MockUser[] = [
  {
    name: 'aapo',
    points: 15,
    admin: true,
  },
  {
    name: 'viltsu',
    points: 16,
    admin: true,
  },
  {
    name: 'osku',
    points: 10,
    admin: true,
  },
  {
    name: 'elmo',
    points: 9,
    admin: true,
  },
  {
    name: 'matti',
    points: 6,
    admin: true,
  },
];
export const loginCode = 'a';
export const tournament: TournamentWithGroups = {
  name: 'MM-kisat',
  groups: [
    {
      name: 'A',
      matches: [
        {
          home: 'Qatar',
          away: 'Ecuador',
          date: new Date('2022-11-19T19:00:00'),
          id: 1,
        },
        {
          home: 'Senegal',
          away: 'Hollanti',
          date: new Date('2022-11-21T19:00:00'),
          id: 2,
        },
        {
          home: 'Qatar',
          away: 'Senegal',
          date: new Date('2022-11-25T16:00:00'),
          id: 3,
        },
        {
          home: 'Hollanti',
          away: 'Ecuador',
          date: new Date('2022-11-25T19:00:00'),
          id: 4,
        },
        {
          home: 'Hollanti',
          away: 'Qatar',
          date: new Date('2022-11-29T18:00:00'),
          id: 5,
        },
        {
          home: 'Ecuador',
          away: 'Senegal',
          date: new Date('2022-11-29T18:00:00'),
          id: 6,
        },
      ],
    },
    {
      name: 'B',
      matches: [
        {
          home: 'Englanti',
          away: 'Iran',
          date: new Date('2022-11-21T16:00:00'),
          id: 7,
        },
        {
          home: 'Usa',
          away: 'Wales',
          date: new Date('2022-11-21T22:00:00'),
          id: 8,
        },
        {
          home: 'Wales',
          away: 'Iran',
          date: new Date('2022-11-25T13:00:00'),
          id: 9,
        },
        {
          home: 'Englanti',
          away: 'USA',
          date: new Date('2022-11-25T22:00:00'),
          id: 10,
        },
        {
          home: 'Wales',
          away: 'Englanti',
          date: new Date('2022-11-29T22:00:00'),
          id: 11,
        },
        {
          home: 'Iran',
          away: 'USA',
          date: new Date('2022-11-29T22:00:00'),
          id: 12,
        },
      ],
    },
    {
      name: 'C',
      matches: [
        {
          home: 'Argentina',
          away: 'Saudi Arabia',
          date: new Date('2022-11-22T13:00:00'),
          id: 13,
        },
        {
          home: 'Meksiko',
          away: 'Puola',
          date: new Date('2022-11-22T19:00:00'),
          id: 14,
        },
        {
          home: 'Puola',
          away: 'Saudi Arabia',
          date: new Date('2022-11-26T16:00:00'),
          id: 15,
        },
        {
          home: 'Argentina',
          away: 'Meksiko',
          date: new Date('2022-11-26T22:00:00'),
          id: 16,
        },
        {
          home: 'Puola',
          away: 'Argentina',
          date: new Date('2022-11-30T22:00:00'),
          id: 17,
        },
        {
          home: 'Saudi Arabia',
          away: 'Meksiko',
          date: new Date('2022-11-30T22:00:00'),
          id: 18,
        },
      ],
    },
    {
      name: 'D',
      matches: [
        {
          home: 'Tanska',
          away: 'Tunisia',
          date: new Date('2022-11-22T16:00:00'),
          id: 19,
        },
        {
          home: 'Ranska',
          away: 'Australia',
          date: new Date('2022-11-22T22:00:00'),
          id: 20,
        },
        {
          home: 'Tunisia',
          away: 'Australia',
          date: new Date('2022-11-26T13:00:00'),
          id: 21,
        },
        {
          home: 'Ranska',
          away: 'Tanska',
          date: new Date('2022-11-26T19:00:00'),
          id: 22,
        },
        {
          home: 'Tunisia',
          away: 'Ranska',
          date: new Date('2022-11-30T18:00:00'),
          id: 23,
        },
        {
          home: 'Australia',
          away: 'Tanska',
          date: new Date('2022-11-30T18:00:00'),
          id: 24,
        },
      ],
    },
    {
      name: 'E',
      matches: [
        {
          home: 'Saksa',
          away: 'Japani',
          date: new Date('2022-11-23T16:00:00'),
          id: 25,
        },
        {
          home: 'Espanja',
          away: 'Costa Rica',
          date: new Date('2022-11-23T19:00:00'),
          id: 26,
        },
        {
          home: 'Japani',
          away: 'Costa Rica',
          date: new Date('2022-11-27T13:00:00'),
          id: 27,
        },
        {
          home: 'Espanja',
          away: 'Saksa',
          date: new Date('2022-11-27T22:00:00'),
          id: 28,
        },
        {
          home: 'Japani',
          away: 'Espanja',
          date: new Date('2022-12-01T22:00:00'),
          id: 29,
        },
        {
          home: 'Costa Rica',
          away: 'Saksa',
          date: new Date('2022-12-01T22:00:00'),
          id: 30,
        },
      ],
    },
    {
      name: 'F',
      matches: [
        {
          home: 'Marokko',
          away: 'Kroatia',
          date: new Date('2022-11-23T13:00:00'),
          id: 31,
        },
        {
          home: 'Belgia',
          away: 'Kanada',
          date: new Date('2022-11-23T22:00:00'),
          id: 32,
        },
        {
          home: 'Belgia',
          away: 'Marokko',
          date: new Date('2022-11-27T16:00:00'),
          id: 33,
        },
        {
          home: 'Kroatia',
          away: 'Kanada',
          date: new Date('2022-11-27T19:00:00'),
          id: 34,
        },
        {
          home: 'Kanada',
          away: 'Marokko',
          date: new Date('2022-12-01T18:00:00'),
          id: 35,
        },
        {
          home: 'Kroatia',
          away: 'Belgia',
          date: new Date('2022-12-01T18:00:00'),
          id: 36,
        },
      ],
    },
    {
      name: 'G',
      matches: [
        {
          home: 'Sveitsi',
          away: 'Kamerun',
          date: new Date('2022-11-24T13:00:00'),
          id: 37,
        },
        {
          home: 'Brasilia',
          away: 'Serbia',
          date: new Date('2022-11-24T22:00:00'),
          id: 38,
        },
        {
          home: 'Kamerun',
          away: 'Serbia',
          date: new Date('2022-11-28T13:00:00'),
          id: 39,
        },
        {
          home: 'Brasilia',
          away: 'Sveitsi',
          date: new Date('2022-11-28T19:00:00'),
          id: 40,
        },
        {
          home: 'Kamerun',
          away: 'Brasilia',
          date: new Date('2022-12-02T22:00:00'),
          id: 41,
        },
        {
          home: 'Serbia',
          away: 'Sveitsi',
          date: new Date('2022-12-02T22:00:00'),
          id: 42,
        },
      ],
    },
    {
      name: 'H',
      matches: [
        {
          home: 'Usuguay',
          away: 'Etelä-Korea',
          date: new Date('2022-11-23T16:00:00'),
          id: 43,
        },
        {
          home: 'Portugali',
          away: 'Ghana',
          date: new Date('2022-11-23T19:00:00'),
          id: 44,
        },
        {
          home: 'Etelä-Korea',
          away: 'Ghana',
          date: new Date('2022-11-28T16:00:00'),
          id: 45,
        },
        {
          home: 'Portugali',
          away: 'Uruguay',
          date: new Date('2022-11-28T22:00:00'),
          id: 46,
        },
        {
          home: 'Ghana',
          away: 'Uruguay',
          date: new Date('2022-12-02T18:00:00'),
          id: 47,
        },
        {
          home: 'Etelä-Korea',
          away: 'Portugali',
          date: new Date('2022-12-02T18:00:00'),
          id: 48,
        },
      ],
    },
  ],
  startingDate: new Date('2022-11-19T19:00:00+02:00'),
};
