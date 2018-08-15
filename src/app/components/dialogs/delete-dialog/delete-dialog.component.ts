import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StoryEditPreviewComponent } from '../../shared/story-edit-preview/story-edit-preview.component'

@Component({
  selector: 'delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<StoryEditPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
