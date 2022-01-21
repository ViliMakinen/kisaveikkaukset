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
            team: '',
            seed: 0
          },
            {
              team: '',
              seed: 0
            },
          ]
        }, {
          teams: [{
            team: '',
            seed: 0,
          },
            {
              team: '',
              seed: 0
            }]
        }],
      NFCdivisionals: [
        {
          teams: [{
            team: '',
            seed: 0
          },
            {
              team: '',
              seed: 0
            },
          ]
        }, {
          teams: [{
            team: '',
            seed: 0,
          },
            {
              team: '',
              seed: 0
            }]
        }
      ],
      AFCchampionship: {
        teams: [{
          team: '',
          seed: 0,
        },
          {
            team: '',
            seed: 0
          }]
      },
      NFCchampionship: {
        teams: [{
          team: '',
          seed: 0,
        },
          {
            team: '',
            seed: 0
          }]
      },
      superbowlists: [{
        team: '',
        seed: 0
      }, {
        team: '',
        seed: 0
      }],
      winner: { team: '', seed: 0 }
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
      this.bracketPredictions.nflBracket.AFCdivisionals[0].teams[0]!.team = this.competition.AFCteams[0].team
      this.tempAFCdivisionals.push(this.bracketPredictions.nflBracket.AFCdivisionals[0].teams[0]!)
      this.bracketPredictions.nflBracket.AFCdivisionals[0].teams[0]!.seed = this.competition.AFCteams[0].seed

      this.bracketPredictions.nflBracket.NFCdivisionals[0].teams[0]!.team = this.competition.NFCteams[0].team
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
      this.bracketPredictions.nflBracket.AFCchampionship.teams.push({ team: '', seed: 0 });
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
            team: 'Titans',
            seed: 1
          },
            {
              team: '',
              seed: 0
            },
          ]
        }, {
          teams: [{
            team: '',
            seed: 0,
          },
            {
              team: '',
              seed: 0
            }]
        }],
      NFCdivisionals: [
        {
          teams: [{
            team: 'Packers',
            seed: 1
          },
            {
              team: '',
              seed: 0
            },
          ]
        }, {
          teams: [{
            team: '',
            seed: 0,
          },
            {
              team: '',
              seed: 0
            }]
        }
      ],
      AFCchampionship: {
        teams: [{
          team: '',
          seed: 0,
        },
          {
            team: '',
            seed: 0
          }]
      },
      NFCchampionship: {
        teams: [{
          team: '',
          seed: 0,
        },
          {
            team: '',
            seed: 0
          }]
      },
      superbowlists: [{
        team: '',
        seed: 0
      }, {
        team: '',
        seed: 0
      }],
      winner: { team: '', seed: 0 }
    }
    this.tempAFCdivisionals = [{ team: 'Titans', seed: 1 }];
    this.tempNFCdivisionals = [{ team: 'Packers', seed: 1 }];
  }


  isAFCDivisional(team: SeededTeam) {
    return this.tempAFCdivisionals.map(tempTeam => tempTeam.team).includes(team.team) || this.bracketPredictions.nflBracket.AFCdivisionals.flatMap(pair => pair.teams).map(team => team.team).includes(team.team);
  }


  isNFCDivisional(team: SeededTeam) {
    return this.tempNFCdivisionals.map(tempTeam => tempTeam.team).includes(team.team) || this.bracketPredictions.nflBracket.NFCdivisionals.flatMap(pair => pair.teams).map(team => team.team).includes(team.team);
  }

  isAFCChampionship(team: SeededTeam) {
    return this.bracketPredictions.nflBracket.AFCchampionship.teams.map(team => team.team).includes(team.team);
  }

  isNFCChampionship(team: SeededTeam) {
    return this.bracketPredictions.nflBracket.NFCchampionship.teams.map(team => team.team).includes(team.team);
  }

  selectWinner(team: SeededTeam) {
    this.bracketPredictions.nflBracket.winner = team;
  }

  isWinner(team: SeededTeam) {
    return this.bracketPredictions.nflBracket.winner.team === team.team;
  }

  isSuperbowlist(team: SeededTeam) {
    return this.bracketPredictions.nflBracket.superbowlists.map(team => team.team).includes(team.team);
  }

  selectNFCchampionships(team: SeededTeam, pair: SeededPair) {
    if (this.bracketPredictions.nflBracket.NFCchampionship.teams.includes(team)) {
      this.bracketPredictions.nflBracket.NFCchampionship.teams = this.bracketPredictions.nflBracket.NFCchampionship.teams.filter((team) => !pair.teams.includes(team));
      this.bracketPredictions.nflBracket.NFCchampionship.teams.push({ team: '', seed: 0 });
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

  isAFCDivisonalWinner(team: SeededTeam) {
    const AFCDivisionalWinners = this.results.nflBracket.AFCdivisionals.flatMap(seededPair => seededPair.teams.map(team => team.team));
    const playerAFCDivisionalPredictions = (this.player.predictions.find(tournament => tournament.tournament === 'NFL-playoffs')!.predictions as NFLBracket).nflBracket.AFCdivisionals.flatMap(seededPair => seededPair.teams.map(team => team.team));
    return AFCDivisionalWinners.includes(team.team) && playerAFCDivisionalPredictions.includes(team.team);
  }

  isNFCDivisionalWinner(team: SeededTeam) {
    return false;
  }
}

