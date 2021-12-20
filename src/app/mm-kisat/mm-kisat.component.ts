import { Component } from '@angular/core';

@Component({
  selector: 'app-mm-kisat',
  templateUrl: './mm-kisat.component.html',
  styleUrls: ['./mm-kisat.component.scss']
})
export class MmKisatComponent {

  competition = {
    name: 'MM-kisat',
    dates: '27.12.2021-4.1.2022',
    pairs: [
      {
        teams: ['Suomi', 'Ruotsi'],
        seed: 1
      },
      {
        teams: ['Kanada', 'Venäjä'],
        seed: 2
      },
      {
        teams: ['Ranska', 'Italia'],
        seed: 3
      },
      {
        teams: ['Norja', 'Viro'],
        seed: 4
      },
    ]
  }
}
