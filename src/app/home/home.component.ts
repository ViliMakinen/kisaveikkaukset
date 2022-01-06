import { Component } from '@angular/core';
import { UserService } from '../user.service';

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
    pairs: [
      {
        teams: ['Salzburg', 'Munchen'],
        seed: 0
      },
      {
        teams:['Sporting CP', 'Man. City'],
        seed:0
      },
      {
        teams:['Benfica', 'Ajax'],
        seed:0
      },
      {
        teams:['Chelsea', 'LOSC'],
        seed:0
      },
      {
        teams:['Atletico', 'Man. United'],
        seed:0
      },
      {
        teams:['Villareal', 'Juventus'],
        seed:0
      },
      {
        teams:['Inter', 'Liverpool'],
        seed:0
      },
      {
        teams:['Paris', 'Real Madrid'],
        seed:0
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
    xyz: 'viltsu',
    abc: 'aapo',
    opl: 'elmo',
    zzz : 'EM',
    zzy: 'emmi',
    zzk: 'aikku',
    zzl: 'petra',
    zzm: 'jukka',
    zzr: 'osku'
  }
  code: string = '';
  user: string | null;

  constructor(private userService: UserService) {
    // oikeampi tapa tehdä tämä on käyttämällä Observableja (niin, että user olisi Observable), koska silloin
    // käyttäjän muuttuessa myös arvo päivittyy automaattisesti. Muutetaan Observable -maailmaan myöhemmin.
    this.user = userService.getUser();
  }

  tryLogIn() {
    Object.entries(this.loginCodes).forEach(keyValue => {
      if (keyValue[0] === this.code) {
        this.userService.setUser(keyValue[1]);
        // nyt joudutaan asettamaan tämä user myös tälle home-komponentille tässä, koska muuten se ei tiedä, että
        // user on muuttunut
        this.user = keyValue[1];
      }
    })
  }
}
