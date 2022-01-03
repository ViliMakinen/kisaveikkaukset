import { Component, Input } from '@angular/core';

export interface Bracket {
  semiFinalists: Semifinalist
  finalists: Finalist
  winner: Winner
}

export interface Winner {
  finalWinner: null | string;
}

export interface Semifinalist {
  QF1winner: null | string,
  QF2winner: null | string,
  QF3winner: null | string,
  QF4winner: null | string
}

export interface Finalist {
  SF1winner: null | string,
  SF2winner: null | string
}

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent {
  @Input()
  pairs!: any;

  bracketInfo: Bracket = {
    semiFinalists: {
      QF1winner: null,
      QF2winner: null,
      QF3winner: null,
      QF4winner: null
    },
    finalists: {
      SF1winner: null,
      SF2winner: null
    },
    winner: {
      finalWinner: null
    }
  }

  areQuarterFinalistsNotSelected(): boolean {
    const values = Object.values(this.bracketInfo.semiFinalists);
    return values.includes(null);
  }

  areSemiFinalistsNotSelected(): boolean {
    const values = Object.values(this.bracketInfo.finalists);
    return values.includes(null);
  }

  setQuarterFinalWinners(pair: any, team: string): void {
    if (pair.seed === 1) {
      this.bracketInfo.semiFinalists.QF1winner = team;
    } else if (pair.seed === 2) {
      this.bracketInfo.semiFinalists.QF2winner = team;
    } else if (pair.seed === 3) {
      this.bracketInfo.semiFinalists.QF3winner = team;
    } else if (pair.seed === 4) {
      this.bracketInfo.semiFinalists.QF4winner = team;
    }
  }

  isQuarterFinalist(team: string | null): boolean {
    if (team === null) {
      return false;
    }
    return team === this.bracketInfo.semiFinalists.QF1winner || team === this.bracketInfo.semiFinalists.QF2winner || team === this.bracketInfo.semiFinalists.QF3winner || team === this.bracketInfo.semiFinalists.QF4winner;
  }

  isSemiFinalist(team: string | null): boolean {
    if (team === null) {
      return false;
    }
    return team === this.bracketInfo.finalists.SF1winner || team === this.bracketInfo.finalists.SF2winner;
  }

  clearAll(): void {
    Object.keys(this.bracketInfo.winner).forEach(key => this.bracketInfo.winner[key as keyof Winner] = null);
    Object.keys(this.bracketInfo.finalists).forEach(key => this.bracketInfo.finalists[key as keyof Finalist] = null);
    Object.keys(this.bracketInfo.semiFinalists).forEach(key => this.bracketInfo.semiFinalists[key as keyof Semifinalist] = null);
  }
}
