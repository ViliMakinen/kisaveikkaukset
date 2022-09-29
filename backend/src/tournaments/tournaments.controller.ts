import {Controller, Get} from '@nestjs/common';
import {MatchResult, Tournament, TournamentWithResults} from '../../constants';
import {Observable, of} from 'rxjs';

const tournament: Tournament = {
  name: 'MM-kisat',
  startingDate: new Date('2022-11-19T19:00:00+02:00'),
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
      teams: [
        { name: 'Qatar', points: 0, predictedPoints: 0 },
        { name: 'Ecuador', points: 0, predictedPoints: 0 },
        { name: 'Senegal', points: 0, predictedPoints: 0 },
        { name: 'Hollanti', points: 0, predictedPoints: 0 },
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
          away: 'Usa',
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
          away: 'Usa',
          date: new Date('2022-11-29T22:00:00'),
          id: 12,
        },
      ],
      teams: [
        { name: 'Englanti', points: 0, predictedPoints: 0 },
        { name: 'Iran', points: 0, predictedPoints: 0 },
        { name: 'Usa', points: 0, predictedPoints: 0 },
        { name: 'Wales', points: 0, predictedPoints: 0 },
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
      teams: [
        { name: 'Argentina', points: 0, predictedPoints: 0 },
        { name: 'Saudi Arabia', points: 0, predictedPoints: 0 },
        { name: 'Meksiko', points: 0, predictedPoints: 0 },
        { name: 'Puola', points: 0, predictedPoints: 0 },
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
      teams: [
        { name: 'Ranska', points: 0, predictedPoints: 0 },
        { name: 'Tanska', points: 0, predictedPoints: 0 },
        { name: 'Tunisia', points: 0, predictedPoints: 0 },
        { name: 'Australia', points: 0, predictedPoints: 0 },
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
      teams: [
        { name: 'Espanja', points: 0, predictedPoints: 0 },
        { name: 'Saksa', points: 0, predictedPoints: 0 },
        { name: 'Japani', points: 0, predictedPoints: 0 },
        { name: 'Costa Rica', points: 0, predictedPoints: 0 },
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
      teams: [
        { name: 'Belgia', points: 0, predictedPoints: 0 },
        { name: 'Kanada', points: 0, predictedPoints: 0 },
        { name: 'Marokko', points: 0, predictedPoints: 0 },
        { name: 'Kroatia', points: 0, predictedPoints: 0 },
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
      teams: [
        { name: 'Brasilia', points: 0, predictedPoints: 0 },
        { name: 'Serbia', points: 0, predictedPoints: 0 },
        { name: 'Sveitsi', points: 0, predictedPoints: 0 },
        { name: 'Kamerun', points: 0, predictedPoints: 0 },
      ],
    },
    {
      name: 'H',
      matches: [
        {
          home: 'Uruguay',
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
      teams: [
        { name: 'Portugali', points: 0, predictedPoints: 0 },
        { name: 'Ghana', points: 0, predictedPoints: 0 },
        { name: 'Uruguay', points: 0, predictedPoints: 0 },
        { name: 'Etelä-Korea', points: 0, predictedPoints: 0 },
      ],
    },
  ],
};
const results: MatchResult[] = [
  {
    id: 1,
    result: '1',
  },
  {
    id: 2,
    result: 'X',
  },
  {
    id: 3,
    result: '2',
  },
  {
    id: 4,
    result: '1',
  },
  {
    id: 5,
    result: '1',
  },
  {
    id: 6,
    result: 'X',
  },
  {
    id: 7,
    result: '2',
  },
  {
    id: 8,
    result: '1',
  },
  {
    id: 9,
    result: 'X',
  },
  {
    id: 10,
    result: null,
  },
  {
    id: 11,
    result: null,
  },
  {
    id: 12,
    result: null,
  },
  {
    id: 13,
    result: null,
  },
  {
    id: 14,
    result: null,
  },
  {
    id: 15,
    result: null,
  },
  {
    id: 16,
    result: null,
  },
  {
    id: 17,
    result: null,
  },
  {
    id: 18,
    result: null,
  },
  {
    id: 19,
    result: null,
  },
  {
    id: 20,
    result: null,
  },
  {
    id: 21,
    result: null,
  },
  {
    id: 22,
    result: null,
  },
  {
    id: 23,
    result: null,
  },
  {
    id: 24,
    result: null,
  },
  {
    id: 25,
    result: null,
  },
  {
    id: 26,
    result: null,
  },
  {
    id: 27,
    result: null,
  },
  {
    id: 28,
    result: null,
  },
  {
    id: 29,
    result: null,
  },
  {
    id: 30,
    result: null,
  },
  {
    id: 31,
    result: null,
  },
  {
    id: 32,
    result: null,
  },
  {
    id: 33,
    result: null,
  },
  {
    id: 34,
    result: null,
  },
  {
    id: 35,
    result: null,
  },
  {
    id: 36,
    result: null,
  },
  {
    id: 37,
    result: null,
  },
  {
    id: 38,
    result: null,
  },
  {
    id: 39,
    result: null,
  },
  {
    id: 40,
    result: null,
  },
  {
    id: 41,
    result: null,
  },
  {
    id: 42,
    result: null,
  },
  {
    id: 43,
    result: null,
  },
  {
    id: 44,
    result: null,
  },
  {
    id: 45,
    result: null,
  },
  {
    id: 46,
    result: null,
  },
  {
    id: 47,
    result: null,
  },
  {
    id: 48,
    result: null,
  },
];

@Controller('tournaments')
export class TournamentsController {
  @Get()
  getTournament(): Observable<TournamentWithResults> {
    return of({ tournament, results });
  }
}
