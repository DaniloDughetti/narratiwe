import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SettingsListComponent } from "../../settings/settings-list/settings-list.component";

@Component({
  selector: 'author-dialog',
  templateUrl: './author-dialog.component.html',
  styleUrls: ['./author-dialog.component.css']
})
export class AuthorDialogComponent {

  constructor(public dialogRef: MatDialogRef<SettingsListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}