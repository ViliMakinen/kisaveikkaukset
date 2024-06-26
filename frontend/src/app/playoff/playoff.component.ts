import { Component, OnInit } from '@angular/core';
import { countries, Country, Match, MatchResult, PlayerGroup, Team, Tournament } from '../constants';

interface PlayoffBrackets {
  leftSide: PlayoffBracket;
  rightSide: PlayoffBracket;
  grandFinal: Match;
  winner: string;
}

interface PlayoffBracket {
  quarterFinals: Match[];
  semiFinals: Match[];
  bracketFinal: Match;
  winner: string;
}

@Component({
  selector: 'app-playoff',
  templateUrl: './playoff.component.html',
  styleUrl: './playoff.component.scss',
})
export class PlayoffComponent implements OnInit {
  group: PlayerGroup | null = null;
  tournament: Tournament | null = null;
  countries: Country[] = [];

  userPlayoffBracket: PlayoffBrackets = {
    leftSide: {
      quarterFinals: [
        {
          home: 'Espanja',
          away: '',
          id: 1,
          result: null,
          date: new Date('2024-06-30T22:00:00+02:00'),
        },
        {
          home: 'Saksa',
          away: 'Tanska',
          id: 2,
          result: null,
          date: new Date('2024-06-29T22:00:00+02:00'),
        },
        {
          home: 'Portugali',
          away: '',
          id: 3,
          result: null,
          date: new Date('2024-07-01T22:00:00+02:00'),
        },
        {
          home: 'Ranska',
          away: '',
          id: 4,
          result: null,
          date: new Date('2024-07-01T19:00:00+02:00'),
        },
      ],
      semiFinals: [
        {
          home: '',
          away: '',
          id: 5,
          result: null,
          date: new Date('2024-07-05T19:00:00+02:00'),
        },
        {
          home: '',
          away: '',
          id: 6,
          result: null,
          date: new Date('2024-07-05T22:00:00+02:00'),
        },
      ],
      bracketFinal: {
        home: '',
        away: '',
        id: 7,
        result: null,
        date: new Date('2024-07-09T22:00:00+02:00'),
      },
      winner: '',
    },
    rightSide: {
      quarterFinals: [
        {
          home: '',
          away: '',
          id: 1,
          result: null,
          date: new Date('2024-07-02T19:00:00+02:00'),
        },
        {
          home: 'Itävalta',
          away: '',
          id: 2,
          result: null,
          date: new Date('2024-07-02T22:00:00+02:00'),
        },
        {
          home: 'Englanti',
          away: '',
          id: 3,
          result: null,
          date: new Date('2024-06-30T19:00:00+02:00'),
        },
        {
          home: 'Sveitsi',
          away: 'Italia',
          id: 4,
          result: null,
          date: new Date('2024-06-29T19:00:00+02:00'),
        },
      ],
      semiFinals: [
        {
          home: '',
          away: '',
          id: 5,
          result: null,
          date: new Date('2024-07-06T22:00:00+02:00'),
        },
        {
          home: '',
          away: '',
          id: 6,
          result: null,
          date: new Date('2024-07-06T19:00:00+02:00'),
        },
      ],
      bracketFinal: {
        home: '',
        away: '',
        id: 7,
        result: null,
        date: new Date('2024-07-10T22:00:00+02:00'),
      },
      winner: '',
    },
    grandFinal: {
      home: '',
      away: '',
      id: 1,
      result: null,
      date: new Date('2024-07-14T22:00:00+02:00'),
    },
    winner: '',
  };
  bracketSide: 'left' | 'right' = 'left';

  ngOnInit(): void {
    this.countries = countries;
  }

  fetchFlag(teamName: string): string {
    const check = this.countries.find((team) => team.name === teamName);
    if (check) {
      return check.id;
    } else {
      return '';
    }
  }

  chooseQFWinner(winner: string, id: number) {
    if (id === 0) {
      this.userPlayoffBracket.leftSide.semiFinals[0].home = winner;
    } else if (id === 1) {
      this.userPlayoffBracket.leftSide.semiFinals[0].away = winner;
    } else if (id === 2) {
      this.userPlayoffBracket.leftSide.semiFinals[1].home = winner;
    } else if (id === 3) {
      this.userPlayoffBracket.leftSide.semiFinals[1].away = winner;
    }
  }

  chooseSFWinner(winner: string, id: number, side: string) {
    if (id === 0) {
      this.userPlayoffBracket.leftSide.bracketFinal.home = winner;
    } else if (id === 1) {
      this.userPlayoffBracket.leftSide.bracketFinal.away = winner;
    }
  }

  chooseBFWinner(winner: string, side: string) {
    if (side === 'left') {
      this.userPlayoffBracket.grandFinal.home = winner;
    } else if (side === 'right') {
      this.userPlayoffBracket.grandFinal.away = winner;
    }
  }

  checkIfChosenForSF(team: string, side: string) {
    if (side === 'left') {
      this.userPlayoffBracket.leftSide.semiFinals.map((match) => {
        if (match.home === team || match.away === team || team !== '') {
          return true;
        }
        return false;
      });
    } else if (side === 'right') {
      this.userPlayoffBracket.rightSide.semiFinals.map((match) => {
        if (match.home === team || match.away === team || team !== '') {
          return true;
        }
        return false;
      });
    }
    return false;
  }

  chooseChampion(home: string) {
    this.userPlayoffBracket.winner = home;
  }
}
