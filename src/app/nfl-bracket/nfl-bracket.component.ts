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

  // winnerCheck(team: SeededTeam, code: string): boolean {
  //   if (code === 'AFCdiv') {
  //     const AFCDivisionalWinners = this.results.nflBracket.AFCdivisionals.flatMap(seededPair => seededPair.teams.map(team => team.team));
  //     const playerAFCDivisionalPredictions = (this.player.predictions.find(tournament => tournament.tournament === 'NFL-playoffs')!.predictions as NFLBracket).nflBracket.AFCdivisionals.flatMap(seededPair => seededPair.teams.map(team => team.team));
  //     return AFCDivisionalWinners.includes(team.team) && playerAFCDivisionalPredictions.includes(team.team);
  //   } else if (code === 'NFCdiv') {
  //     const NFCDivisionalWinners = this.results.nflBracket.NFCdivisionals.flatMap(seededPair => seededPair.teams.map(team => team.team));
  //     const playerNFCDivisionalPredictions = (this.player.predictions.find(tournament => tournament.tournament === 'NFL-playoffs')!.predictions as NFLBracket).nflBracket.NFCdivisionals.flatMap(seededPair => seededPair.teams.map(team => team.team));
  //     return NFCDivisionalWinners.includes(team.team) && playerNFCDivisionalPredictions.includes(team.team);
  //   } else if (code === 'AFCchamp') {
  //     const AFCchampWinners = this.results.nflBracket.AFCchampionship.teams.flatMap(team => team.team);
  //     const playerAFCchampPredictions = (this.player.predictions.find(tournament => tournament.tournament === 'NFL-playoffs')!.predictions as NFLBracket).nflBracket.AFCchampionship.teams.flatMap(team => team.team);
  //     return AFCchampWinners.includes(team.team) && playerAFCchampPredictions.includes(team.team);
  //   } else if (code === 'NFCchamp') {
  //     const NFCchampWinners = this.results.nflBracket.NFCchampionship.teams.flatMap(team => team.team);
  //     const playerNFCchampPredictions = (this.player.predictions.find(tournament => tournament.tournament === 'NFL-playoffs')!.predictions as NFLBracket).nflBracket.NFCchampionship.teams.flatMap(team => team.team);
  //     return NFCchampWinners.includes(team.team) && playerNFCchampPredictions.includes(team.team);
  //   } else if (code === 'SuperBowl') {
  //     const SuperBowlists = this.results.nflBracket.superbowlists.flatMap(team => team.team);
  //     const playerSuperBowlists = (this.player.predictions.find(tournament => tournament.tournament === 'NFL-playoffs')!.predictions as NFLBracket).nflBracket.superbowlists.flatMap(team => team.team);
  //     return SuperBowlists.includes(team.team) && playerSuperBowlists.includes(team.team)
  //   } else {
  //     return (this.player.predictions.find(tournament => tournament.tournament === 'NFL-playoffs')!.predictions as NFLBracket).nflBracket.winner.team === this.results.nflBracket.winner.team
  //   }
  // }

  haveGamesBeenPlayed(code: string): boolean {
    if (code === 'AFCdiv') {
      return this.results.nflBracket.AFCdivisionals.flatMap(seededPair => seededPair.teams.map(team => team.team)).includes('')
    } else if (code === 'NFCdiv') {
      return this.results.nflBracket.NFCdivisionals.flatMap(seededPair => seededPair.teams.map(team => team.team)).includes('')
    } else if (code === 'AFCchamp') {
      return this.results.nflBracket.AFCchampionship.teams.flatMap(team => team.team).includes('')
    } else if (code === 'NFCchamp') {
      return this.results.nflBracket.NFCchampionship.teams.flatMap(team => team.team).includes('')
    } else if (code === 'SuperBowl') {
      return this.results.nflBracket.superbowlists.map(team => team.team).includes('')
    } else {
      return this.results.nflBracket.winner.team.includes('')
    }
  }

  getResult(team: SeededTeam, code: string) {
    if (code === 'AFCdiv') {
      const AFCDivisionalWinners = this.results.nflBracket.AFCdivisionals.flatMap(seededPair => seededPair.teams.map(team => team.team));
      const playerAFCDivisionalPredictions = (this.player.predictions.find(tournament => tournament.tournament === 'NFL-playoffs')!.predictions as NFLBracket).nflBracket.AFCdivisionals.flatMap(seededPair => seededPair.teams.map(team => team.team));
      if (playerAFCDivisionalPredictions.includes('')) {
        return 'white'
      } else if (!AFCDivisionalWinners.includes(team.team) && playerAFCDivisionalPredictions.includes(team.team)) {
        return 'red'
      } else if (AFCDivisionalWinners.includes(team.team) && playerAFCDivisionalPredictions.includes(team.team)) {
        return 'green'
      } return 'white'
    } else if (code === 'NFCdiv') {
      const NFCDivisionalWinners = this.results.nflBracket.NFCdivisionals.flatMap(seededPair => seededPair.teams.map(team => team.team));
      const playerNFCDivisionalPredictions = (this.player.predictions.find(tournament => tournament.tournament === 'NFL-playoffs')!.predictions as NFLBracket).nflBracket.NFCdivisionals.flatMap(seededPair => seededPair.teams.map(team => team.team));
      if (playerNFCDivisionalPredictions.includes('')){
        return 'white'
      }else if (!NFCDivisionalWinners.includes(team.team) && playerNFCDivisionalPredictions.includes(team.team)){
        return 'red'
      }else if (NFCDivisionalWinners.includes(team.team) && playerNFCDivisionalPredictions.includes(team.team)){
        return 'green'
      } return 'white'
    } else if (code === 'AFCchamp') {
      const AFCchampWinners = this.results.nflBracket.AFCchampionship.teams.flatMap(team => team.team);
      const playerAFCchampPredictions = (this.player.predictions.find(tournament => tournament.tournament === 'NFL-playoffs')!.predictions as NFLBracket).nflBracket.AFCchampionship.teams.flatMap(team => team.team);
      if (this.haveGamesBeenPlayed('AFCchamp') || playerAFCchampPredictions.includes('')) {
        return 'white'
      } else if (!AFCchampWinners.includes(team.team) && playerAFCchampPredictions.includes(team.team)){
        return 'red' 
      } else if (AFCchampWinners.includes(team.team) && playerAFCchampPredictions.includes(team.team)){
        return 'green'
      } return 'white'
    } else if (code === 'NFCchamp') {
      const NFCchampWinners = this.results.nflBracket.NFCchampionship.teams.flatMap(team => team.team);
      const playerNFCchampPredictions = (this.player.predictions.find(tournament => tournament.tournament === 'NFL-playoffs')!.predictions as NFLBracket).nflBracket.NFCchampionship.teams.flatMap(team => team.team);
      if (this.haveGamesBeenPlayed('NFCchamp') || playerNFCchampPredictions.includes('')){
        return 'white'
      }else if (!NFCchampWinners.includes(team.team) && playerNFCchampPredictions.includes(team.team)){
        return 'red'
      } else if (NFCchampWinners.includes(team.team) && playerNFCchampPredictions.includes(team.team)){
        return 'green'
      } return 'white'
    } else if (code === 'SuperBowl') {
      const SuperBowlists = this.results.nflBracket.superbowlists.map(team => team.team);
      const playerSuperBowlists = (this.player.predictions.find(tournament => tournament.tournament === 'NFL-playoffs')!.predictions as NFLBracket).nflBracket.superbowlists.flatMap(team => team.team);
      if (this.haveGamesBeenPlayed('SuperBowl') || playerSuperBowlists.includes('')) {
        return 'white'
      } else if (!SuperBowlists.includes(team.team) && playerSuperBowlists.includes(team.team)){
        return 'blue'
      } else if (SuperBowlists.includes(team.team) && playerSuperBowlists.includes(team.team)){
        return 'green'
      } return 'white'
    } else {
      const SuperBowlWinner =  this.results.nflBracket.winner.team;
      const PlayerWinnerPick = (this.player.predictions.find(tournament => tournament.tournament === 'NFL-playoffs')!.predictions as NFLBracket).nflBracket.winner.team;
      if (this.haveGamesBeenPlayed('winner') || PlayerWinnerPick === ''){
        return 'white'
      } else if (SuperBowlWinner === PlayerWinnerPick){
        return 'green'
      } else if (SuperBowlWinner !== PlayerWinnerPick){
        return 'red'
      }
      return 'white'
    }
  }

}

