import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'popup-dialog',
  templateUrl: './popup-dialog-progress.component.html',
})
export class PopupDialogProgress implements OnDestroy {
  constructor(
    public dialogRef: MatDialogRef<PopupDialogProgress>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
    

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    console.log("POPup DESTROY")
}
}
