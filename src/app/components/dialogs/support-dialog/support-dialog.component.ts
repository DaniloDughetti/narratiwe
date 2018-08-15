import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SettingsListComponent } from "../../settings/settings-list/settings-list.component";


@Component({
  selector: 'support-dialog',
  templateUrl: './support-dialog.component.html',
  styleUrls: ['./support-dialog.component.css']
})
export class SupportDialogComponent {

  constructor(public dialogRef: MatDialogRef<SettingsListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}