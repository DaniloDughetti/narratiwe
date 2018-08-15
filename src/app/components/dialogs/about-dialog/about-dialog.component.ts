import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SettingsListComponent } from "../../settings/settings-list/settings-list.component";

@Component({
  selector: 'about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.css']
})
export class AboutDialogComponent {

  constructor(public dialogRef: MatDialogRef<SettingsListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
