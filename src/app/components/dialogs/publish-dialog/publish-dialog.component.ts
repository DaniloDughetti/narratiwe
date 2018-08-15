import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StoryPreviewComponent } from '../../shared/story-preview/story-preview.component';

@Component({
  selector: 'publish-dialog',
  templateUrl: './publish-dialog.component.html',
  styleUrls: ['./publish-dialog.component.css']
})
export class PublishDialogComponent{

  constructor(
    public dialogRef: MatDialogRef<StoryPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

}
