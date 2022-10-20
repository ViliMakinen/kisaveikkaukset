import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  name: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nickName: string },
  ) {
    this.name = data.nickName;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isNameValid() {
    return this.name.match('^[A-Za-z]+$') && this.name.length > 1;
  }
}
