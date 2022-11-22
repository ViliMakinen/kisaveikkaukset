import { PrismaClient } from '@prisma/client';
import { Tournament } from '../constants';

const prisma = new PrismaClient();

const tournament: Tournament = {
  name: 'Jalkapallon MM-kisat 2022',
  startingDate: new Date('2022-11-20T18:00:00+02:00'),
  extraPredictions: {
    mostGoals: '',
    topFour: [],
    mostCards: '',
    fastestGoal: null,
    highestScoring: null,
    headToHead: [
      {
        contestants: ['Englanti', 'Saksa'],
        winner: null,
        type: 'winner',
      },
      {
        contestants: ['Ranska', 'Espanja'],
        winner: null,
        type: 'winner',
      },
      {
        contestants: ['Brasilia', 'Argentina'],
        winner: null,
        type: 'winner',
      },
      {
        contestants: ['Kane', 'Mbappé'],
        winner: null,
        type: 'goal',
      },
      {
        contestants: ['Messi', 'Ronaldo'],
        winner: null,
        type: 'goal',
      },
      {
        contestants: ['Neymar', 'de Bruyne'],
        winner: null,
        type: 'pass',
      },
    ],
  },
  groups: [
    {
      name: 'A',
      matches: [
        {
          home: 'Qatar',
          away: 'Ecuador',
          date: new Date('2022-11-20T18:00:00+02:00'),
          id: 1,
          result: null,
        },
        {
          home: 'Senegal',
          away: 'Hollanti',
          date: new Date('2022-11-21T18:00:00+02:00'),
          id: 2,
          result: null,
        },
        {
          home: 'Qatar',
          away: 'Senegal',
          date: new Date('2022-11-25T15:00:00+02:00'),
          id: 3,
          result: null,
        },
        {
          home: 'Hollanti',
          away: 'Ecuador',
          date: new Date('2022-11-25T18:00:00+02:00'),
          id: 4,
          result: null,
        },
        {
          home: 'Hollanti',
          away: 'Qatar',
          date: new Date('2022-11-29T17:00:00+02:00'),
          id: 5,
          result: null,
        },
        {
          home: 'Ecuador',
          away: 'Senegal',
          date: new Date('2022-11-29T17:00:00+02:00'),
          id: 6,
          result: null,
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
          date: new Date('2022-11-21T15:00:00+02:00'),
          id: 7,
          result: null,
        },
        {
          home: 'Usa',
          away: 'Wales',
          date: new Date('2022-11-21T21:00:00+02:00'),
          id: 8,
          result: null,
        },
        {
          home: 'Wales',
          away: 'Iran',
          date: new Date('2022-11-25T12:00:00+02:00'),
          id: 9,
          result: null,
        },
        {
          home: 'Englanti',
          away: 'Usa',
          date: new Date('2022-11-25T21:00:00+02:00'),
          id: 10,
          result: null,
        },
        {
          home: 'Wales',
          away: 'Englanti',
          date: new Date('2022-11-29T21:00:00+02:00'),
          id: 11,
          result: null,
        },
        {
          home: 'Iran',
          away: 'Usa',
          date: new Date('2022-11-29T21:00:00+02:00'),
          id: 12,
          result: null,
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
          date: new Date('2022-11-22T12:00:00+02:00'),
          id: 13,
          result: null,
        },
        {
          home: 'Meksiko',
          away: 'Puola',
          date: new Date('2022-11-22T18:00:00+02:00'),
          id: 14,
          result: null,
        },
        {
          home: 'Puola',
          away: 'Saudi Arabia',
          date: new Date('2022-11-26T15:00:00+02:00'),
          id: 15,
          result: null,
        },
        {
          home: 'Argentina',
          away: 'Meksiko',
          date: new Date('2022-11-26T21:00:00+02:00'),
          id: 16,
          result: null,
        },
        {
          home: 'Puola',
          away: 'Argentina',
          date: new Date('2022-11-30T21:00:00+02:00'),
          id: 17,
          result: null,
        },
        {
          home: 'Saudi Arabia',
          away: 'Meksiko',
          date: new Date('2022-11-30T21:00:00+02:00'),
          id: 18,
          result: null,
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
          date: new Date('2022-11-22T15:00:00+02:00'),
          id: 19,
          result: null,
        },
        {
          home: 'Ranska',
          away: 'Australia',
          date: new Date('2022-11-22T21:00:00+02:00'),
          id: 20,
          result: null,
        },
        {
          home: 'Tunisia',
          away: 'Australia',
          date: new Date('2022-11-26T12:00:00+02:00'),
          id: 21,
          result: null,
        },
        {
          home: 'Ranska',
          away: 'Tanska',
          date: new Date('2022-11-26T18:00:00+02:00'),
          id: 22,
          result: null,
        },
        {
          home: 'Tunisia',
          away: 'Ranska',
          date: new Date('2022-11-30T17:00:00+02:00'),
          id: 23,
          result: null,
        },
        {
          home: 'Australia',
          away: 'Tanska',
          date: new Date('2022-11-30T17:00:00+02:00'),
          id: 24,
          result: null,
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
          date: new Date('2022-11-23T15:00:00+02:00'),
          id: 25,
          result: null,
        },
        {
          home: 'Espanja',
          away: 'Costa Rica',
          date: new Date('2022-11-23T18:00:00+02:00'),
          id: 26,
          result: null,
        },
        {
          home: 'Japani',
          away: 'Costa Rica',
          date: new Date('2022-11-27T12:00:00+02:00'),
          id: 27,
          result: null,
        },
        {
          home: 'Espanja',
          away: 'Saksa',
          date: new Date('2022-11-27T21:00:00+02:00'),
          id: 28,
          result: null,
        },
        {
          home: 'Japani',
          away: 'Espanja',
          date: new Date('2022-12-01T21:00:00+02:00'),
          id: 29,
          result: null,
        },
        {
          home: 'Costa Rica',
          away: 'Saksa',
          date: new Date('2022-12-01T21:00:00+02:00'),
          id: 30,
          result: null,
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
          date: new Date('2022-11-23T12:00:00+02:00'),
          id: 31,
          result: null,
        },
        {
          home: 'Belgia',
          away: 'Kanada',
          date: new Date('2022-11-23T21:00:00+02:00'),
          id: 32,
          result: null,
        },
        {
          home: 'Belgia',
          away: 'Marokko',
          date: new Date('2022-11-27T15:00:00+02:00'),
          id: 33,
          result: null,
        },
        {
          home: 'Kroatia',
          away: 'Kanada',
          date: new Date('2022-11-27T18:00:00+02:00'),
          id: 34,
          result: null,
        },
        {
          home: 'Kanada',
          away: 'Marokko',
          date: new Date('2022-12-01T17:00:00+02:00'),
          id: 35,
          result: null,
        },
        {
          home: 'Kroatia',
          away: 'Belgia',
          date: new Date('2022-12-01T17:00:00+02:00'),
          id: 36,
          result: null,
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
          date: new Date('2022-11-24T12:00:00+02:00'),
          id: 37,
          result: null,
        },
        {
          home: 'Brasilia',
          away: 'Serbia',
          date: new Date('2022-11-24T21:00:00+02:00'),
          id: 38,
          result: null,
        },
        {
          home: 'Kamerun',
          away: 'Serbia',
          date: new Date('2022-11-28T12:00:00+02:00'),
          id: 39,
          result: null,
        },
        {
          home: 'Brasilia',
          away: 'Sveitsi',
          date: new Date('2022-11-28T18:00:00+02:00'),
          id: 40,
          result: null,
        },
        {
          home: 'Kamerun',
          away: 'Brasilia',
          date: new Date('2022-12-02T21:00:00+02:00'),
          id: 41,
          result: null,
        },
        {
          home: 'Serbia',
          away: 'Sveitsi',
          date: new Date('2022-12-02T21:00:00+02:00'),
          id: 42,
          result: null,
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
          date: new Date('2022-11-24T15:00:00+02:00'),
          id: 43,
          result: null,
        },
        {
          home: 'Portugali',
          away: 'Ghana',
          date: new Date('2022-11-24T18:00:00+02:00'),
          id: 44,
          result: null,
        },
        {
          home: 'Etelä-Korea',
          away: 'Ghana',
          date: new Date('2022-11-28T15:00:00+02:00'),
          id: 45,
          result: null,
        },
        {
          home: 'Portugali',
          away: 'Uruguay',
          date: new Date('2022-11-28T21:00:00+02:00'),
          id: 46,
          result: null,
        },
        {
          home: 'Ghana',
          away: 'Uruguay',
          date: new Date('2022-12-02T17:00:00+02:00'),
          id: 47,
          result: null,
        },
        {
          home: 'Etelä-Korea',
          away: 'Portugali',
          date: new Date('2022-12-02T17:00:00+02:00'),
          id: 48,
          result: null,
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

async function main() {
  const tournamentJson = JSON.parse(JSON.stringify(tournament));
  const tournamentExtraPredictionsJson = JSON.parse(JSON.stringify(tournament.extraPredictions));
  await prisma.tournament.create({
    data: {
      tournamentData: tournamentJson,
      lastUpdated: null,
      extraPredictions: tournamentExtraPredictionsJson,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
