import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, Input } from '@angular/core';

export interface Bracket {
  semiFinalists: {
    QF1winner: null | string,
    QF2winner: null | string,
    QF3winner: null | string,
    QF4winner: null | string
  },
  finalists: {
    SF1winner: null | string,
    SF2winner: null | string
  },
  winner: {
    finalWinner: null | string
  }
}


@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent {
  @Input()
  pairs!: any;


  bracketInfo:  Bracket = {
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
    const keyValues = Object.entries(this.bracketInfo.semiFinalists)
    const values = keyValues.map(keyValue => keyValue[1])
    return values.includes(null)
  }

  areSemiFinalistsNotSelected(): boolean {
    const keyValues = Object.entries(this.bracketInfo.finalists)
    const values = keyValues.map(keyValue => keyValue[1])
    return values.includes(null)
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
      return false
    }
    if (team === this.bracketInfo.semiFinalists.QF1winner || team === this.bracketInfo.semiFinalists.QF2winner || team === this.bracketInfo.semiFinalists.QF3winner || team === this.bracketInfo.semiFinalists.QF4winner) {
      return true
    }
    return false
  }

  isSemiFinalist(team: string | null): boolean {
    if (team === null) {
      return false
    }
    if (team === this.bracketInfo.finalists.SF1winner || team === this.bracketInfo.finalists.SF2winner) {
      return true
    }
    return false
  }

  clearAll(): void {
    const SFkeyValues = Object.entries(this.bracketInfo.semiFinalists)
    const QFkeyValues = Object.entries(this.bracketInfo.finalists)
    const FkeyValues = Object.entries(this.bracketInfo.winner)
  }
}