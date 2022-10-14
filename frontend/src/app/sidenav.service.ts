import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  isOpen = new BehaviorSubject(false);

  toggle(): void {
    this.isOpen.next(!this.isOpen.value);
  }

  close(): void {
    this.isOpen.next(false);
  }
}
