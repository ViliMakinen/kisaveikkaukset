import { Component, OnInit } from '@angular/core';
import { GroupedObservable } from 'rxjs';

interface TournamentWithGroups {
  name: string;
  groups: Group[];
}
interface Group {
  name: string;
  matches: Match[];
}
interface Match {
  home: string;
  away: string;
  date: Date;
}

@Component({
  selector: 'app-mm-kisat',
  templateUrl: './mm-kisat.component.html',
  styleUrls: ['./mm-kisat.component.scss'],
})
export class MmKisatComponent {
  tournament: TournamentWithGroups = {
    name: 'MM-kisat',
    groups: [
      {
        name: 'A',
        matches: [
          {
            home: 'suomi',
            away: 'ruotsi',
            date: new Date(),
          },
        ],
      },
      {
        name: 'B',
        matches: [
          {
            home: 'svenska',
            away: 'sfafasf',
            date: new Date(),
          },
        ],
      },
    ],
  };
}
