import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-msg-dialog',
  templateUrl: './custom-msg-dialog.component.html',
  styleUrls: ['./custom-msg-dialog.component.scss'],
})
export class CustomMsgDialogComponent {
  constructor(public dialogRef: MatDialogRef<CustomMsgDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {}
}
