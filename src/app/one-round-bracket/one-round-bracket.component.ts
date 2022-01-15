import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OneRoundPredictions, Pair, User } from '../constants';

@Component({
  selector: 'app-one-round-bracket',
  templateUrl: './one-round-bracket.component.html',
  styleUrls: ['./one-round-bracket.component.scss']
})
export class OneRoundBracketComponent {
  @Input()
  pairs!: Pair[];

  @Input()
  player!: User;

  @Input()
  user!: User;

  @Input()
  arePredictionsLocked!: boolean;

  @Output()
  submitUserSelections = new EventEmitter<OneRoundPredictions>();

  winners: OneRoundPredictions = { oneRoundPredictions: [] };

  constructor() {
    setTimeout(() => this.winners = this.player.predictions[0].predictions as OneRoundPredictions, 0)
  }

  setMatchWinner(pair: Pair, team: string) {
    if (this.winners.oneRoundPredictions.includes(team)) {
      this.winners.oneRoundPredictions = this.winners.oneRoundPredictions.filter((team) => !pair.teams.includes(team));
    } else {
      this.winners.oneRoundPredictions = this.winners.oneRoundPredictions.filter((team) => !pair.teams.includes(team));
      this.winners.oneRoundPredictions.push(team);
    }
  }

  isMatchWinner(team: string): boolean {
    return this.winners.oneRoundPredictions.includes(team);
  }

  clearAll() {
    this.winners.oneRoundPredictions = [];
  }

  submitSelections() {
    this.submitUserSelections.emit({ oneRoundPredictions: this.winners.oneRoundPredictions });
  }
}
