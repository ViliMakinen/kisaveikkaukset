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
  arePredictionsLocked!: boolean;

  @Input()
  competition!: SeededTournament;

  @Output()
  submitUserSelections = new EventEmitter<NFLBracket>();

  bracketPredictions: NFLBracket = {
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

  AFCpairs: SeededPair[] = [];
  NFCpairs: SeededPair[] = [];
  tempAFCdivisionals: SeededTeam[] = [];
  tempNFCdivisionals: SeededTeam[] = [];

  constructor() {
    setTimeout(() => this.bracketPredictions = this.player.predictions.find(prediction => prediction.tournament === 'NFL-playoffs')!.predictions as NFLBracket, 0)
  }

  ngOnInit() {
    this.AFCpairs = this.pairTeamsBySeed(this.competition.AFCteams.filter(team => team.seed !== 1));
    this.NFCpairs = this.pairTeamsBySeed(this.competition.NFCteams.filter(team => team.seed !== 1));

    this.bracketPredictions.AFCdivisionals[0].teams[0]!.team = this.competition.AFCteams[0].team
    this.tempAFCdivisionals.push(this.bracketPredictions.AFCdivisionals[0].teams[0]!)
    this.bracketPredictions.AFCdivisionals[0].teams[0]!.seed = this.competition.AFCteams[0].seed

    this.bracketPredictions.NFCdivisionals[0].teams[0]!.team = this.competition.NFCteams[0].team
    this.tempNFCdivisionals.push(this.bracketPredictions.NFCdivisionals[0].teams[0]!)
    this.bracketPredictions.NFCdivisionals[0].teams[0]!.seed = this.competition.NFCteams[0].seed
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

  clearAll() {
    // this.winners.oneRoundPredictions = [];
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
      this.bracketPredictions.AFCdivisionals = this.pairTeamsBySeed(this.tempAFCdivisionals);
    }
  }

  isAFCDivisional(team: SeededTeam) {
    return this.tempAFCdivisionals.includes(team);
  }

  isNFCDivisional(team: SeededTeam) {
    return this.tempNFCdivisionals.includes(team);
  }

  selectAFCchampionships(team: SeededTeam, pair: SeededPair) {
    if (this.bracketPredictions.AFCchampionship.teams.includes(team)) {
      this.bracketPredictions.AFCchampionship.teams = this.bracketPredictions.AFCchampionship.teams.filter((team) => !pair.teams.includes(team));
      this.bracketPredictions.AFCchampionship.teams.push({ team: '', seed: 0 });
    } else {
      this.bracketPredictions.AFCchampionship.teams = this.bracketPredictions.AFCchampionship.teams.filter((team) => !pair.teams.includes(team));
      if (this.bracketPredictions.AFCchampionship.teams[0].seed === 0) {
        this.bracketPredictions.AFCchampionship.teams.shift();
        this.bracketPredictions.AFCchampionship.teams.push(team);
      } else if (this.bracketPredictions.AFCchampionship.teams[1].seed === 0) {
        this.bracketPredictions.AFCchampionship.teams.splice(1, 1)
      }
    }
  }

  isAFCChampionship(team: SeededTeam) {
    return this.bracketPredictions.AFCchampionship.teams.includes(team);
  }

  isNFCChampionship(team: SeededTeam) {
    return this.bracketPredictions.NFCchampionship.teams.includes(team);
  }

  selectWinner(team: SeededTeam) {
    this.bracketPredictions.winner = team;
    console.log(this.bracketPredictions)
  }

  isWinner(team: SeededTeam) {
    return this.bracketPredictions.winner === team;
  }

  isSuperbowlist(team: SeededTeam) {
    return this.bracketPredictions.superbowlists.includes(team);
  }

  selectNFCchampionships(team: SeededTeam, pair: SeededPair) {
    if (this.bracketPredictions.NFCchampionship.teams.includes(team)) {
      this.bracketPredictions.NFCchampionship.teams = this.bracketPredictions.NFCchampionship.teams.filter((team) => !pair.teams.includes(team));
      this.bracketPredictions.NFCchampionship.teams.push({ team: '', seed: 0 });
    } else {
      this.bracketPredictions.NFCchampionship.teams = this.bracketPredictions.NFCchampionship.teams.filter((team) => !pair.teams.includes(team));
      if (this.bracketPredictions.NFCchampionship.teams[0].seed === 0) {
        this.bracketPredictions.NFCchampionship.teams.shift();
        this.bracketPredictions.NFCchampionship.teams.push(team);
      } else if (this.bracketPredictions.NFCchampionship.teams[1].seed === 0) {
        this.bracketPredictions.NFCchampionship.teams.splice(1, 1)
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
      this.bracketPredictions.NFCdivisionals = this.pairTeamsBySeed(this.tempNFCdivisionals);
    }
  }
}
