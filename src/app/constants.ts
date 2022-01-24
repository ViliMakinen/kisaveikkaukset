export const loginCodes = {
  xyz: 'Viltsu',
  abc: 'Aapo',
  opl: 'Elmo',
  zzz: 'Eetu-Matti',
  zzy: 'Emmi',
  zzk: 'Aikku',
  zzl: 'Petra',
  zzm: 'Jukka',
  zzr: 'Osku',
  results: 'results'
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

export const seededTournaments: SeededTournament[] = [

  {
    name: 'NFL-playoffs',
    url: 'https://www.nfl.com/standings/playoff-picture',
    dates: 'Tammikuu 2022',
    AFCteams: [
      {
        name: 'Titans',
        seed: 1
      },
      {
        name: 'Chiefs',
        seed: 2
      },
      {
        name: 'Bills',
        seed: 3
      },
      {
        name: 'Bengals',
        seed: 4
      },
      {
        name: 'Raiders',
        seed: 5
      },
      {
        name: 'Patriots',
        seed: 6
      },
      {
        name: 'Steelers',
        seed: 7
      }],

    NFCteams: [
      {
        name: 'Packers',
        seed: 1
      },
      {
        name: 'Bucs',
        seed: 2
      },
      {
        name: 'Cowboys',
        seed: 3
      },
      {
        name: 'Rams',
        seed: 4
      },
      {
        name: 'Cardinals',
        seed: 5
      },
      {
        name: '49ers',
        seed: 6
      },
      {
        name: 'Eagles',
        seed: 7
      },
    ]
  }
]

export interface Pair {
  teams: string[],
  seed: number | null
}

export interface SeededPair {
  teams: SeededTeam[]
}

export interface SeededTeam {
  name: string,
  seed: number
}

export interface Tournament {
  name: string,
  url: string,
  dates: string,
  pairs: Pair[]
}

export interface SeededTournament {
  name: string,
  url: string,
  dates: string,
  AFCteams: SeededTeam[],
  NFCteams: SeededTeam[]
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
    predictions: OneRoundPredictions | Bracket | NFLBracket
    locked: boolean,
    tournamentPoints?: number
  }[],
}

export interface NFLBracket {
  nflBracket: {
    AFCdivisionals: SeededPair[];
    NFCdivisionals: SeededPair[];
    AFCchampionship: SeededPair;
    NFCchampionship: SeededPair;
    superbowlists: SeededTeam[];
    winner: SeededTeam;
  }
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
