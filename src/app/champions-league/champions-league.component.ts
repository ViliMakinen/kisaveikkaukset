import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { OneRoundPredictions, tournaments, User } from '../constants';

@Component({
  selector: 'app-champions-league',
  templateUrl: './champions-league.component.html',
  styleUrls: ['./champions-league.component.scss']
})
export class ChampionsLeagueComponent {

  competition = tournaments[1];
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

  getResults() : OneRoundPredictions {
    return this.users?.find(user => user.name === 'results')?.predictions.find(prediction => prediction.tournament === 'Champions League')?.predictions as OneRoundPredictions
  }
}
