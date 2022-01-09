import { Component } from '@angular/core';
import { UserService } from '../user.service';

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

export interface User {
  name: string,
  predictions: string[],
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
    name: 'Champions League playoffs (jalkapallo)',
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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  players = players;
  tournaments = tournaments;
  loginCodes = {
    xyz: 'Viltsu',
    abc: 'Aapo',
    opl: 'Elmo',
    zzz: 'EM',
    zzy: 'emmi',
    zzk: 'aikku',
    zzl: 'petra',
    zzm: 'jukka',
    zzr: 'osku'
  }
  code: string = '';
  user: User | null = null;

  constructor(public userService: UserService) {
  }

  tryLogIn() {
    Object.entries(this.loginCodes).forEach(keyValue => {
      if (keyValue[0] === this.code) {
        this.userService.getUser(keyValue[1]).then(user => this.user = user)
      }
    })
  }
}
