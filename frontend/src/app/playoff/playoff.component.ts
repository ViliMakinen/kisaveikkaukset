import { Component, OnInit } from '@angular/core';
import { countries, Country, Match, MatchResult, PlayerGroup, Team, Tournament } from '../constants';
import { TournamentService } from '../tournament.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../group.service';
import { UserService } from '../user.service';

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
          away: 'Georgia',
          id: 1,
          result: null,
          date: new Date('2024-06-30T22:00:00+03:00'),
        },
        {
          home: 'Saksa',
          away: 'Tanska',
          id: 2,
          result: null,
          date: new Date('2024-06-29T22:00:00+03:00'),
        },
        {
          home: 'Portugali',
          away: 'Slovenia',
          id: 3,
          result: null,
          date: new Date('2024-07-01T22:00:00+03:00'),
        },
        {
          home: 'Ranska',
          away: 'Belgia',
          id: 4,
          result: null,
          date: new Date('2024-07-01T19:00:00+03:00'),
        },
      ],
      semiFinals: [
        {
          home: '',
          away: '',
          id: 5,
          result: null,
          date: new Date('2024-07-05T19:00:00+03:00'),
        },
        {
          home: '',
          away: '',
          id: 6,
          result: null,
          date: new Date('2024-07-05T22:00:00+03:00'),
        },
      ],
      bracketFinal: {
        home: '',
        away: '',
        id: 7,
        result: null,
        date: new Date('2024-07-09T22:00:00+03:00'),
      },
    },
    rightSide: {
      quarterFinals: [
        {
          home: 'Romania',
          away: 'Hollanti',
          id: 1,
          result: null,
          date: new Date('2024-07-02T19:00:00+03:00'),
        },
        {
          home: 'Itävalta',
          away: 'Turkki',
          id: 2,
          result: null,
          date: new Date('2024-07-02T22:00:00+03:00'),
        },
        {
          home: 'Englanti',
          away: 'Slovakia',
          id: 3,
          result: null,
          date: new Date('2024-06-30T19:00:00+03:00'),
        },
        {
          home: 'Sveitsi',
          away: 'Italia',
          id: 4,
          result: null,
          date: new Date('2024-06-29T19:00:00+03:00'),
        },
      ],
      semiFinals: [
        {
          home: '',
          away: '',
          id: 5,
          result: null,
          date: new Date('2024-07-06T22:00:00+03:00'),
        },
        {
          home: '',
          away: '',
          id: 6,
          result: null,
          date: new Date('2024-07-06T19:00:00+03:00'),
        },
      ],
      bracketFinal: {
        home: '',
        away: '',
        id: 7,
        result: null,
        date: new Date('2024-07-10T22:00:00+03:00'),
      },
    },
    grandFinal: {
      home: '',
      away: '',
      id: 1,
      result: null,
      date: new Date('2024-07-14T22:00:00+03:00'),
    },
    winner: '',
  };
  bracketSide: 'left' | 'right' = 'left';

  constructor(
    private tournamentService: TournamentService,
    private groupService: GroupService,
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.countries = countries;
    this.groupService.getGroupById(this.route.snapshot.params['groupId']).subscribe((group) => {
      this.userPlayoffBracket = group.users.find(
        (user) => user.id === this.userService.user.id,
      )!.predictions.playoffPredictions;
    });
  }

  fetchFlag(teamName: string): string {
    const check = this.countries.find((team) => team.name === teamName);
    if (check) {
      return check.id;
    } else {
      return '';
    }
  }

  chooseQFWinner(winner: string, id: number, side: 'leftSide' | 'rightSide') {
    this.userPlayoffBracket[side].bracketFinal.home = '';
    this.userPlayoffBracket[side].bracketFinal.away = '';
    if (side === 'leftSide') {
      this.userPlayoffBracket.grandFinal.home = '';
    } else {
      this.userPlayoffBracket.grandFinal.away = '';
    }
    this.userPlayoffBracket.winner = '';

    if (id === 0) {
      this.userPlayoffBracket[side].semiFinals[0].home = winner;
    } else if (id === 1) {
      this.userPlayoffBracket[side].semiFinals[0].away = winner;
    } else if (id === 2) {
      this.userPlayoffBracket[side].semiFinals[1].home = winner;
    } else if (id === 3) {
      this.userPlayoffBracket[side].semiFinals[1].away = winner;
    }
  }

  chooseSFWinner(winner: string, id: number, side: 'leftSide' | 'rightSide') {
    if (side === 'leftSide') {
      this.userPlayoffBracket.grandFinal.home = '';
    } else {
      this.userPlayoffBracket.grandFinal.away = '';
    }
    this.userPlayoffBracket.winner = '';

    if (id === 0) {
      this.userPlayoffBracket[side].bracketFinal.home = winner;
    } else if (id === 1) {
      this.userPlayoffBracket[side].bracketFinal.away = winner;
    }
  }

  chooseBFWinner(winner: string, side: string) {
    this.userPlayoffBracket.winner = '';
    if (side === 'left') {
      this.userPlayoffBracket.grandFinal.home = winner;
    } else if (side === 'right') {
      this.userPlayoffBracket.grandFinal.away = winner;
    }
  }

  checkIfChosenForSF(team: string, side: 'leftSide' | 'rightSide') {
    return !!this.userPlayoffBracket[side].semiFinals.find((match) => {
      return match.home === team || match.away === team;
    });
  }

  chooseChampion(home: string) {
    this.userPlayoffBracket.winner = home;
  }

  areQuarterFinalsUnfinished(semiFinals: Match[]) {
    return semiFinals.some((final) => final.home === '' || final.away === '');
  }

  areSemiFinalsUnfinished(bracketWinners: Match) {
    return bracketWinners.home === '' || bracketWinners.away === '';
  }

  areBracketsUnfinished() {
    return this.userPlayoffBracket.grandFinal.home === '' || this.userPlayoffBracket.grandFinal.away === '';
  }

  saveUserPlayoffPredictions() {
    this.tournamentService
      .savePlayoffPredictions(this.userPlayoffBracket, this.route.snapshot.params['groupId'])
      .subscribe((res) => this.router.navigate(['../'], { relativeTo: this.route }));
  }
}
