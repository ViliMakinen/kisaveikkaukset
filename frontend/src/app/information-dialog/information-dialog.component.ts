import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-information-dialog',
  templateUrl: './information-dialog.component.html',
  styleUrls: ['./information-dialog.component.scss'],
})
export class InformationDialogComponent {
  constructor(public dialogRef: MatDialogRef<InformationDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
