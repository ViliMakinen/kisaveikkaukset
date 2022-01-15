import { Component, OnInit } from '@angular/core';
import { Bracket, Finalist, SeededPair, Semifinalist, Winner, SeededTeam, seededTournaments, OneRoundPredictions, tournaments, User } from '../constants';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nfl-playoffs',
  templateUrl: './nfl-playoffs.component.html',
  styleUrls: ['./nfl-playoffs.component.scss']
})
export class NFLPlayoffsComponent {
  competition = seededTournaments[0];
  user: User | null = null;
  users: User[] | null = null;
  userIndex: number = 0;

  constructor(private userService: UserService) {
    this.user = userService.getCurrentUser();
    userService.getUsers().then(users => {
      this.users = users;
      this.userIndex = this.users.findIndex(player => player.name === this.user!.name);
    });
  }

  get arePredictionsLocked(): boolean {
    return this.user!.predictions.find(prediction => prediction.tournament === 'Champions League')!.locked;
  }

  submitUserSelections(oneRoundPrediction: OneRoundPredictions) {
    const newPredictions = this.user!.predictions.map(prediction => {
      if (prediction.tournament === this.competition.name) {
        return {
          tournament: this.competition.name,
          predictions: oneRoundPrediction,
          locked: true,
        }
      } else {
        return prediction
      }
    })
    this.userService.updateUserPredictions({
      ...this.user!,
      predictions: newPredictions
    }).then(() => {
      console.log('Updated successfully!');
      this.userService.getUser(this.user!.name).then(user => this.user = user);
    });
  }

  unlockPredictionsForUser() {
    const unlockedPredictions = this.user!.predictions.map(prediction => {
      if (prediction.tournament === this.competition.name) {
        return {
          tournament: this.competition.name,
          predictions: prediction.predictions,
          locked: false,
        }
      } else {
        return prediction;
      }
    })
    this.userService.updateUserPredictions({
      ...this.user!,
      predictions: unlockedPredictions
    }).then(() => {
      console.log('Unlocked successfully!');
      this.userService.getUser(this.user!.name).then(user => this.user = user);
    })
  }

  isTabLocked(player: User): boolean {
    if (player.name === this.user!.name) {
      return false;
    }
    return !this.user?.predictions.find(prediction => prediction.tournament === 'Champions League')!.locked;
  }
}


