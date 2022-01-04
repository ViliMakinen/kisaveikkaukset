import { Component } from '@angular/core';

export interface Pair {
  teams: string[],
  seed: number
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
    pairs: []
  },
]

export const players: Players[] = [
  { name: 'Viltsu', score: 11 },
  { name: 'Aapo', score: 10 },
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
    xyz: 'viltsu',
    abc: 'aapo',
    opl: 'elmo'
  }
  code: string = '';
  user: string | null = null;



  tryLogIn() {
    Object.entries(this.loginCodes).forEach(keyValue => {
      if (keyValue[0] === this.code) {
        this.user = keyValue[1]
      }
    })
  }

}
