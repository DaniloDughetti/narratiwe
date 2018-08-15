import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChapterEditComponent } from '../../shared/chapter-edit/chapter-edit.component';

@Component({
  selector: 'create-shared-chapter-dialog',
  templateUrl: './create-shared-chapter-dialog.component.html',
  styleUrls: ['./create-shared-chapter-dialog.component.css']
})
export class CreateSharedChapterDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ChapterEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    
}
