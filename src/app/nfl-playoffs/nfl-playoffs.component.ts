import { Component } from '@angular/core';
import { NFLBracket, SeededTournament, tournaments, User } from '../constants';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nfl-playoffs',
  templateUrl: './nfl-playoffs.component.html',
  styleUrls: ['./nfl-playoffs.component.scss'],
})
export class NFLPlayoffsComponent {
  competition = tournaments[1] as SeededTournament;
  user: User | null = null;
  users: User[] | null = null;
  userIndex: number = 0;

  constructor(private userService: UserService) {
    this.user = userService.getCurrentUser();
    userService.getUsers().then((users) => {
      this.users = users;
      this.userIndex = this.users.findIndex((player) => player.name === this.user!.name);
    });
  }

  get arePredictionsLocked(): boolean {
    return this.user!.predictions.find((prediction) => prediction.tournament === 'NFL-playoffs')!.locked;
  }

  playerTournamentPoints(player: User): number {
    return player.predictions.find((prediction) => prediction.tournament === 'NFL-playoffs')!.tournamentPoints!;
  }

  submitUserSelections(nflBracket: NFLBracket) {
    const newPredictions = this.user!.predictions.map((prediction) => {
      if (prediction.tournament === this.competition.name) {
        if (this.user!.name === 'results') {
          this.updateTournamentPoints(prediction.tournament);
          return {
            tournament: this.competition.name,
            predictions: nflBracket,
            locked: false,
            tournamentPoints: 0,
          };
        } else {
          return {
            tournament: this.competition.name,
            predictions: nflBracket,
            locked: true,
            tournamentPoints: this.user?.predictions.find((prediction) => prediction.tournament === 'NFL-playoffs')!.tournamentPoints!,
          };
        }
      } else {
        return prediction;
      }
    });
    console.log(newPredictions);
    this.userService
      .updateUserPredictions({
        ...this.user!,
        predictions: newPredictions,
      })
      .then(() => {
        console.log('Updated successfully!');
        this.userService.getUser(this.user!.name).then((user) => (this.user = user));
      });
  }

  updateTournamentPoints(tournament: string): void {
    this.users?.forEach((user) => {
      const predictionsWithUpdatedPoints = user.predictions.map((prediction) => {
        if (prediction.tournament === tournament) {
          return {
            tournament: prediction.tournament,
            predictions: prediction.predictions,
            locked: prediction.locked,
            tournamentPoints: this.calculateTournamentPoints(prediction.predictions as NFLBracket),
          };
        } else {
          return prediction;
        }
      });
      this.userService
        .updateUserPredictions({
          ...user,
          predictions: predictionsWithUpdatedPoints,
        })
        .then(() => {
          console.log('Updated successfully!');
          this.userService.getUser(this.user!.name).then((user) => (this.user = user));
        });
    });
  }

  calculateTournamentPoints(predictions: NFLBracket) {
    const results = this.user!.predictions.find((prediction) => prediction.tournament === 'NFL-playoffs')!.predictions as NFLBracket;
    const AFCdivisionalPredictions = predictions.nflBracket.AFCdivisionals.flatMap((seededPair) => seededPair.teams.map((seededTeam) => seededTeam.name));
    const NFCdivisionalPredictions = predictions.nflBracket.NFCdivisionals.flatMap((seededPair) => seededPair.teams.map((seededTeam) => seededTeam.name));
    const divisionalPredictions = [...AFCdivisionalPredictions, ...NFCdivisionalPredictions];
    const AFCdivisionalResults = results.nflBracket.AFCdivisionals.flatMap((seededPair) => seededPair.teams.map((seededTeam) => seededTeam.name));
    const NFCdivisionalResults = results.nflBracket.NFCdivisionals.flatMap((seededPair) => seededPair.teams.map((seededTeam) => seededTeam.name));
    const divisionalResults = [...AFCdivisionalResults, ...NFCdivisionalResults];

    // we subtract two from the score to compensate for the fact that two teams are automatically advanced to the championship games, awarding each player two points automatically
    const correctDivisionalPredictions = divisionalPredictions.filter((team) => divisionalResults.includes(team)).length - 2;

    const AFCchampionshipPredictions = predictions.nflBracket.AFCchampionship.teams.map((pair) => pair.name);
    const NFCchampionshipPredictions = predictions.nflBracket.NFCchampionship.teams.map((pair) => pair.name);
    const championshipPredictions = [...AFCchampionshipPredictions, ...NFCchampionshipPredictions];
    const AFCchampionshipResults = results.nflBracket.AFCchampionship.teams.map((pair) => pair.name);
    const NFCchampionshipResults = results.nflBracket.NFCchampionship.teams.map((pair) => pair.name);
    const championshipResults = [...AFCchampionshipResults, ...NFCchampionshipResults];
    const correctChampionshipPredictions = championshipPredictions.filter((team) => championshipResults.includes(team)).length;

    const superbowlistsPredictions = predictions.nflBracket.superbowlists.map((seededTeam) => seededTeam.name);
    const superbowlistsResults = results.nflBracket.superbowlists.map((seededTeam) => seededTeam.name);
    const correctSuperbowlistsPredictions = superbowlistsPredictions.filter((team) => superbowlistsResults.includes(team)).length;

    const correctWinnerPrediction = predictions.nflBracket.winner === results.nflBracket.winner ? 1 : 0;

    return correctDivisionalPredictions + correctChampionshipPredictions + correctSuperbowlistsPredictions + correctWinnerPrediction;
  }

  submitUserSelectionsBackUp(nflBracket: NFLBracket) {
    const newPredictions = this.user!.predictions.map((prediction) => {
      if (prediction.tournament === this.competition.name) {
        return this.user!.name === 'results'
          ? {
              tournament: this.competition.name,
              predictions: this.users?.find((user) => user.name === 'results')?.predictions.find((prediction) => prediction.tournament === 'NFL-playoffs')?.predictions as NFLBracket,
              locked: false,
              tournamentPoints: 0,
            }
          : {
              tournament: this.competition.name,
              predictions: this.users?.find((user) => user.name === 'results')?.predictions.find((prediction) => prediction.tournament === 'NFL-playoffs')?.predictions as NFLBracket,
              locked: true,
              tournamentPoints: 0,
            };
      } else {
        return prediction;
      }
    });
    console.log(newPredictions);
    this.userService
      .updateUserPredictionsBackUp({
        ...this.user!,
        predictions: newPredictions,
      })
      .then(() => {
        console.log('Updated successfully!');
        this.userService.getUser(this.user!.name).then((user) => (this.user = user));
      });
  }

  unlockPredictionsForUser() {
    const unlockedPredictions = this.user!.predictions.map((prediction) => {
      if (prediction.tournament === this.competition.name) {
        return {
          tournament: this.competition.name,
          predictions: prediction.predictions,
          locked: false,
        };
      } else {
        return prediction;
      }
    });
    this.userService
      .updateUserPredictions({
        ...this.user!,
        predictions: unlockedPredictions,
      })
      .then(() => {
        console.log('Unlocked successfully!');
        this.userService.getUser(this.user!.name).then((user) => (this.user = user));
      });
  }

  isTabLocked(player: User): boolean {
    if (player.name === this.user!.name) {
      return false;
    }
    return !this.user?.predictions.find((prediction) => prediction.tournament === 'NFL-playoffs')!.locked;
  }

  getResults(): NFLBracket {
    return this.users?.find((user) => user.name === 'results')?.predictions.find((prediction) => prediction.tournament === 'NFL-playoffs')?.predictions as NFLBracket;
  }
}
