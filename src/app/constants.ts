export const loginCodes = {
  xyz: 'Viltsu',
  abc: 'Aapo',
  opl: 'Elmo',
  zzz: 'EM',
  zzy: 'Emmi',
  zzk: 'Aikku',
  zzl: 'Petra',
  zzm: 'Jukka',
  zzr: 'Osku'
}

export const tournaments: Tournament[] = [
  {
    name: 'Olympialaiset',
    url: 'https://www.suomikiekko.com/talviolympialaiset-jaakiekko-2022/',
    dates: 'Helmikuu 2022',
    pairs: [
      {
        teams: ['Suomi', 'Ruotsi'],
        seed: 1
      },
      {
        teams: ['Kanada', 'Venäjä'],
        seed: 2
      },
      {
        teams: ['Ranska', 'Italia'],
        seed: 3
      },
      {
        teams: ['Norja', 'Viro'],
        seed: 4
      },
    ]
  },
  {
    name: 'Champions League',
    url: 'https://www.uefa.com/uefachampionsleague/news/0265-115e77805e06-3dbc1740a323-1000--2021-22-champions-league',
    dates: 'Helmikuu 2022',
    pairs: [
      {
        teams: ['Salzburg', 'Munchen'],
        seed: null
      },
      {
        teams: ['Sporting CP', 'Man. City'],
        seed: null
      },
      {
        teams: ['Benfica', 'Ajax'],
        seed: null
      },
      {
        teams: ['Chelsea', 'LOSC'],
        seed: null
      },
      {
        teams: ['Atletico', 'Man. United'],
        seed: null
      },
      {
        teams: ['Villareal', 'Juventus'],
        seed: null
      },
      {
        teams: ['Inter', 'Liverpool'],
        seed: null
      },
      {
        teams: ['Paris', 'Real Madrid'],
        seed: null
      },
    ]
  },
]

export const players: Players[] = [
  { name: 'Viltsu', score: 10 },
  { name: 'Aapo', score: 11 },
  { name: 'Elmo', score: 10 },
  { name: 'Osku', score: 10 },
  { name: 'Eetu-Matti', score: 10 }
];

export interface Pair {
  teams: string[],
  seed: number | null
}

export interface Tournament {
  name: string,
  url: string,
  dates: string,
  pairs: Pair[]
}

export interface Players {
  name: string,
  score: number
}

export interface OneRoundPredictions {
  oneRoundPredictions: string[]
}

export interface User {
  name: string,
  points: number,
  predictions: {
    tournament: string,
    predictions: OneRoundPredictions | Bracket
    locked: boolean
  }[],
}

export interface Bracket {
  semiFinalists: Semifinalist
  finalists: Finalist
  winner: Winner
}

export interface Winner {
  finalWinner: null | string;
}

export interface Semifinalist {
  QF1winner: null | string,
  QF2winner: null | string,
  QF3winner: null | string,
  QF4winner: null | string
}

export interface Finalist {
  SF1winner: null | string,
  SF2winner: null | string
}

export function isOneRoundPrediction(prediction: OneRoundPredictions | Bracket): prediction is OneRoundPredictions {
  return (prediction as OneRoundPredictions).oneRoundPredictions !== undefined;
}
