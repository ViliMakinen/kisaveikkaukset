import { Component } from '@angular/core';

@Component({
  selector: 'app-mm-kisat',
  templateUrl: './mm-kisat.component.html',
  styleUrls: ['./mm-kisat.component.scss']
})
export class MmKisatComponent {

  predictions = {
    player: 'Aapo',
    matchWinners: {
      matchOne: '',
      matchTwo: '',
      matchThree: '',
      matchFour: '',
      matchFive: '',
      matchSix: '',
      matchSeven: ''
    }
  }
}
