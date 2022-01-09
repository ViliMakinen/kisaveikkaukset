import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pair, User } from '../home/home.component';

@Component({
  selector: 'app-one-round-bracket',
  templateUrl: './one-round-bracket.component.html',
  styleUrls: ['./one-round-bracket.component.scss']
})
export class OneRoundBracketComponent {
  @Input()
  pairs!: Pair[];

  @Input()
  user!: User;

  @Output()
  submitUserSelections = new EventEmitter<User>();

  winners: string[] = [];

  constructor() {
    setTimeout(() => {
      this.winners = this.user.predictions;
    }, 0);
  }

  setMatchWinner(pair: Pair, team: string) {
    if (this.winners.includes(team)) {
      this.winners = this.winners.filter((team) => !pair.teams.includes(team));
    } else {
      this.winners = this.winners.filter((team) => !pair.teams.includes(team));
      this.winners.push(team);
    }
  }

  isMatchWinner(team: string): boolean {
    return this.winners.includes(team);
  }

  clearAll() {
    this.winners = [];
  }

  submitSelections() {
    this.submitUserSelections.emit({
      name: this.user.name,
      predictions: this.winners
    })
  }
}
