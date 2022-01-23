import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NFLBracket, SeededPair, SeededTeam, SeededTournament, User } from '../constants';


@Component({
  selector: 'app-nfl-bracket',
  templateUrl: './nfl-bracket.component.html',
  styleUrls: ['./nfl-bracket.component.scss']
})
export class NflBracketComponent implements OnInit {

  @Input()
  player!: User;

  @Input()
  user!: User;

  @Input()
  results!: NFLBracket;

  @Input()
  arePredictionsLocked!: boolean;

  @Input()
  competition!: SeededTournament;

  @Output()
  submitUserSelections = new EventEmitter<NFLBracket>();

  bracketPredictions: NFLBracket = {
    nflBracket: {
      AFCdivisionals: [
        {
          teams: [{
            name: '',
            seed: 0
          },
            {
              name: '',
              seed: 0
            },
          ]
        }, {
          teams: [{
            name: '',
            seed: 0,
          },
            {
              name: '',
              seed: 0
            }]
        }],
      NFCdivisionals: [
        {
          teams: [{
            name: '',
            seed: 0
          },
            {
              name: '',
              seed: 0
            },
          ]
        }, {
          teams: [{
            name: '',
            seed: 0,
          },
            {
              name: '',
              seed: 0
            }]
        }
      ],
      AFCchampionship: {
        teams: [{
          name: '',
          seed: 0,
        },
          {
            name: '',
            seed: 0
          }]
      },
      NFCchampionship: {
        teams: [{
          name: '',
          seed: 0,
        },
          {
            name: '',
            seed: 0
          }]
      },
      superbowlists: [{
        name: '',
        seed: 0
      }, {
        name: '',
        seed: 0
      }],
      winner: { name: '', seed: 0 }
    }
  }

  AFCpairs: SeededPair[] = [];
  NFCpairs: SeededPair[] = [];
  tempAFCdivisionals: SeededTeam[] = [];
  tempNFCdivisionals: SeededTeam[] = [];

  constructor() {
    setTimeout(() => {
      this.bracketPredictions = this.player.predictions.find(prediction => prediction.tournament === 'NFL-playoffs')!.predictions as NFLBracket
    }, 0)
  }

  ngOnInit() {
    this.AFCpairs = this.pairTeamsBySeed(this.competition.AFCteams.filter(team => team.seed !== 1));
    this.NFCpairs = this.pairTeamsBySeed(this.competition.NFCteams.filter(team => team.seed !== 1));

    if (!this.player.predictions.find(prediction => prediction.tournament === 'NFL-playoffs')!.locked) {
      this.bracketPredictions.nflBracket.AFCdivisionals[0].teams[0]!.name = this.competition.AFCteams[0].name
      this.tempAFCdivisionals.push(this.bracketPredictions.nflBracket.AFCdivisionals[0].teams[0]!)
      this.bracketPredictions.nflBracket.AFCdivisionals[0].teams[0]!.seed = this.competition.AFCteams[0].seed

      this.bracketPredictions.nflBracket.NFCdivisionals[0].teams[0]!.name = this.competition.NFCteams[0].name
      this.tempNFCdivisionals.push(this.bracketPredictions.nflBracket.NFCdivisionals[0].teams[0]!)
      this.bracketPredictions.nflBracket.NFCdivisionals[0].teams[0]!.seed = this.competition.NFCteams[0].seed
    }
  }

  pairTeamsBySeed(teams: SeededTeam[]): SeededPair[] {
    const tempWildCards = teams.map((element) => {
      return element
    });
    tempWildCards.sort((a, b) => a.seed - b.seed);
    const pairs = [];
    while (tempWildCards.length > 0) {
      pairs.push({ teams: [tempWildCards[0], tempWildCards[tempWildCards.length - 1]] });
      tempWildCards.shift();
      tempWildCards.pop();
    }
    return pairs;
  }

  submitSelections() {
    this.submitUserSelections.emit(this.bracketPredictions);
  }

  selectAFCDivisionals(team: SeededTeam, pair: SeededPair) {
    if (this.tempAFCdivisionals.includes(team)) {
      this.tempAFCdivisionals = this.tempAFCdivisionals.filter((team) => !pair.teams.includes(team));
    } else {
      this.tempAFCdivisionals = this.tempAFCdivisionals.filter((team) => !pair.teams.includes(team));
      this.tempAFCdivisionals.push(team);
    }
    if (this.tempAFCdivisionals.length === 4) {
      this.bracketPredictions.nflBracket.AFCdivisionals = this.pairTeamsBySeed(this.tempAFCdivisionals);
    }
  }

  selectAFCchampionships(team: SeededTeam, pair: SeededPair) {
    if (this.bracketPredictions.nflBracket.AFCchampionship.teams.includes(team)) {
      this.bracketPredictions.nflBracket.AFCchampionship.teams = this.bracketPredictions.nflBracket.AFCchampionship.teams.filter((team) => !pair.teams.includes(team));
      this.bracketPredictions.nflBracket.AFCchampionship.teams.push({ name: '', seed: 0 });
    } else {
      this.bracketPredictions.nflBracket.AFCchampionship.teams = this.bracketPredictions.nflBracket.AFCchampionship.teams.filter((team) => !pair.teams.includes(team));
      if (this.bracketPredictions.nflBracket.AFCchampionship.teams[0].seed === 0) {
        this.bracketPredictions.nflBracket.AFCchampionship.teams.shift();
        this.bracketPredictions.nflBracket.AFCchampionship.teams.push(team);
      } else if (this.bracketPredictions.nflBracket.AFCchampionship.teams[1].seed === 0) {
        this.bracketPredictions.nflBracket.AFCchampionship.teams.splice(1, 1)
      }
    }
  }

  clearAll() {
    this.bracketPredictions.nflBracket = {
      AFCdivisionals: [
        {
          teams: [{
            name: 'Titans',
            seed: 1
          },
            {
              name: '',
              seed: 0
            },
          ]
        }, {
          teams: [{
            name: '',
            seed: 0,
          },
            {
              name: '',
              seed: 0
            }]
        }],
      NFCdivisionals: [
        {
          teams: [{
            name: 'Packers',
            seed: 1
          },
            {
              name: '',
              seed: 0
            },
          ]
        }, {
          teams: [{
            name: '',
            seed: 0,
          },
            {
              name: '',
              seed: 0
            }]
        }
      ],
      AFCchampionship: {
        teams: [{
          name: '',
          seed: 0,
        },
          {
            name: '',
            seed: 0
          }]
      },
      NFCchampionship: {
        teams: [{
          name: '',
          seed: 0,
        },
          {
            name: '',
            seed: 0
          }]
      },
      superbowlists: [{
        name: '',
        seed: 0
      }, {
        name: '',
        seed: 0
      }],
      winner: { name: '', seed: 0 }
    }
    this.tempAFCdivisionals = [{ name: 'Titans', seed: 1 }];
    this.tempNFCdivisionals = [{ name: 'Packers', seed: 1 }];
  }


  isAFCDivisional(team: SeededTeam) {
    return this.tempAFCdivisionals.map(tempTeam => tempTeam.name).includes(team.name) || this.bracketPredictions.nflBracket.AFCdivisionals.flatMap(pair => pair.teams).map(team => team.name).includes(team.name);
  }


  isNFCDivisional(team: SeededTeam) {
    return this.tempNFCdivisionals.map(tempTeam => tempTeam.name).includes(team.name) || this.bracketPredictions.nflBracket.NFCdivisionals.flatMap(pair => pair.teams).map(team => team.name).includes(team.name);
  }

  isAFCChampionship(team: SeededTeam) {
    return this.bracketPredictions.nflBracket.AFCchampionship.teams.map(team => team.name).includes(team.name);
  }

  isNFCChampionship(team: SeededTeam) {
    return this.bracketPredictions.nflBracket.NFCchampionship.teams.map(team => team.name).includes(team.name);
  }

  selectWinner(team: SeededTeam) {
    this.bracketPredictions.nflBracket.winner = team;
  }

  isWinner(team: SeededTeam) {
    return this.bracketPredictions.nflBracket.winner.name === team.name;
  }

  isSuperbowlist(team: SeededTeam) {
    return this.bracketPredictions.nflBracket.superbowlists.map(team => team.name).includes(team.name);
  }

  selectNFCchampionships(team: SeededTeam, pair: SeededPair) {
    if (this.bracketPredictions.nflBracket.NFCchampionship.teams.includes(team)) {
      this.bracketPredictions.nflBracket.NFCchampionship.teams = this.bracketPredictions.nflBracket.NFCchampionship.teams.filter((team) => !pair.teams.includes(team));
      this.bracketPredictions.nflBracket.NFCchampionship.teams.push({ name: '', seed: 0 });
    } else {
      this.bracketPredictions.nflBracket.NFCchampionship.teams = this.bracketPredictions.nflBracket.NFCchampionship.teams.filter((team) => !pair.teams.includes(team));
      if (this.bracketPredictions.nflBracket.NFCchampionship.teams[0].seed === 0) {
        this.bracketPredictions.nflBracket.NFCchampionship.teams.shift();
        this.bracketPredictions.nflBracket.NFCchampionship.teams.push(team);
      } else if (this.bracketPredictions.nflBracket.NFCchampionship.teams[1].seed === 0) {
        this.bracketPredictions.nflBracket.NFCchampionship.teams.splice(1, 1)
      }
    }
  }

  selectNFCDivisionals(team: SeededTeam, pair: SeededPair) {
    if (this.tempNFCdivisionals.includes(team)) {
      this.tempNFCdivisionals = this.tempNFCdivisionals.filter((team) => !pair.teams.includes(team));
    } else {
      this.tempNFCdivisionals = this.tempNFCdivisionals.filter((team) => !pair.teams.includes(team));
      this.tempNFCdivisionals.push(team);
    }
    if (this.tempNFCdivisionals.length === 4) {
      this.bracketPredictions.nflBracket.NFCdivisionals = this.pairTeamsBySeed(this.tempNFCdivisionals);
    }
  }

  haveGamesBeenPlayed(code: string): boolean {
    if (code === 'AFCdiv') {
      return this.results.nflBracket.AFCdivisionals.flatMap(seededPair => seededPair.teams.map(team => team.name)).includes('')
    } else if (code === 'NFCdiv') {
      return this.results.nflBracket.NFCdivisionals.flatMap(seededPair => seededPair.teams.map(team => team.name)).includes('')
    } else if (code === 'AFCchamp') {
      return this.results.nflBracket.AFCchampionship.teams.flatMap(team => team.name).includes('')
    } else if (code === 'NFCchamp') {
      return this.results.nflBracket.NFCchampionship.teams.flatMap(team => team.name).includes('')
    } else if (code === 'SuperBowl') {
      return this.results.nflBracket.superbowlists.map(team => team.name).includes('')
    } else {
      return this.results.nflBracket.winner.name.includes('')
    }
  }

  getDivisionalResults(team: SeededTeam, code: 'AFCdivisionals' | 'NFCdivisionals'): string {
    const divisionalWinners = this.results.nflBracket[code].flatMap(seededPair => seededPair.teams.map(team => team.name));
    const playerDivisionalPredictions = (this.player.predictions.find(tournament => tournament.tournament === 'NFL-playoffs')!.predictions as NFLBracket).nflBracket[code].flatMap(seededPair => seededPair.teams.map(team => team.name));
    if (playerDivisionalPredictions.includes('')) {
      return 'white'
    } else if (!divisionalWinners.includes(team.name) && playerDivisionalPredictions.includes(team.name)) {
      return 'red'
    } else if (divisionalWinners.includes(team.name) && playerDivisionalPredictions.includes(team.name)) {
      return 'green'
    }
    return 'white'
  }

  getChampionshipResults(team: SeededTeam, code: 'AFCchampionship' | 'NFCchampionship'): string {
    const championshipWinners = this.results.nflBracket[code].teams.flatMap(team => team.name);
    const playerChampionshipPredictions = (this.player.predictions.find(tournament => tournament.tournament === 'NFL-playoffs')!.predictions as NFLBracket).nflBracket[code].teams.flatMap(team => team.name);
    if (this.haveGamesBeenPlayed('AFCchamp') || playerChampionshipPredictions.includes('')) {
      return 'white'
    } else if (!championshipWinners.includes(team.name) && playerChampionshipPredictions.includes(team.name)) {
      return 'red'
    } else if (championshipWinners.includes(team.name) && playerChampionshipPredictions.includes(team.name)) {
      return 'green'
    }
    return 'white'
  }

  getSuperbowlResults(team: SeededTeam): string {
    const superbowlists = this.results.nflBracket.superbowlists.map(team => team.name);
    const playerSuperbowlists = (this.player.predictions.find(tournament => tournament.tournament === 'NFL-playoffs')!.predictions as NFLBracket).nflBracket.superbowlists.flatMap(team => team.name);
    if (this.haveGamesBeenPlayed('AFCchamp') || playerSuperbowlists.includes('')) {
      return 'white'
    } else if (!superbowlists.includes(team.name) && playerSuperbowlists.includes(team.name)) {
      return 'red'
    } else if (superbowlists.includes(team.name) && playerSuperbowlists.includes(team.name)) {
      return 'green'
    }
    return 'white'
  }

  getWinner(): string {
    const superbowlWinner = this.results.nflBracket.winner.name;
    const playerWinnerPrediction = (this.player.predictions.find(tournament => tournament.tournament === 'NFL-playoffs')!.predictions as NFLBracket).nflBracket.winner.name;
    if (this.haveGamesBeenPlayed('winner') || playerWinnerPrediction === '') {
      return 'white'
    } else if (superbowlWinner === playerWinnerPrediction) {
      return 'green'
    } else if (superbowlWinner !== playerWinnerPrediction) {
      return 'red'
    }
    return 'white'
  }
}

