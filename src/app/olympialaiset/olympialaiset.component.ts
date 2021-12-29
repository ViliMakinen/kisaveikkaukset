import { Component } from '@angular/core';
import { tournaments } from '../home/home.component';

@Component({
  selector: 'app-olympialaiset',
  templateUrl: './olympialaiset.component.html',
  styleUrls: ['./olympialaiset.component.scss']
})
export class OlympialaisetComponent {
  competition = tournaments[0];
}
