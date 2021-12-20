import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent {
  @Input()
  pairs!: any;

  winners = {
    matchOneWinner: '',
    matchTwoWinner: '',
    matchThreeWinner: '',
    matchFourWinner: '',
  }

  setMatchWinner(pair: any, team: string): void {
    if (pair.seed === 1) {
      this.winners.matchOneWinner = team;
    } else if (pair.seed === 2) {
      this.winners.matchTwoWinner = team;
    } else if (pair.seed === 3) {
      this.winners.matchThreeWinner = team;
    } else if (pair.seed === 4) {
      this.winners.matchFourWinner = team;
    }
  }

  clearAll(): void {
    this.winners.matchOneWinner = '';
    this.winners.matchTwoWinner = '';
    this.winners.matchThreeWinner = '';
    this.winners.matchFourWinner = '';
  }
}
