import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SettingsListComponent } from "../../settings/settings-list/settings-list.component";

@Component({
  selector: 'conditions-dialog',
  templateUrl: './conditions-dialog.component.html',
  styleUrls: ['./conditions-dialog.component.css']
})
export class ConditionsDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SettingsListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
