import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../../../services/data.service';
import { ChapterService } from '../../../services/chapter.service';
import { StoryService } from '../../../services/story.service';
import { Story } from "../../../models/story";
import { Chapter } from "../../../models/chapter";
import { Rating } from "../../../models/rating";
import { User } from "../../../models/user";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateSharedChapterDialogComponent } from '../../dialogs/create-shared-chapter-dialog/create-shared-chapter-dialog.component';

@Component({
  selector: 'chapter-edit',
  templateUrl: './chapter-edit.component.html',
  styleUrls: ['./chapter-edit.component.css']
})
export class ChapterEditComponent implements OnInit {

  private chapter: Chapter;
  private story: Story;
  private isEdited: boolean = false;
  private isNewChapter: boolean = false;
  private tempContent: string;
  private user: User;
  private doneDisabled: boolean = false;

  constructor(private dataService: DataService,
    private location: Location,
    private chapterService: ChapterService,
    private storyService: StoryService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.initEditChapter();
  }

  private initEditChapter() {
    try {
      this.initNavigationParams();
      this.initChapter();
    }
    catch (e) {
      this.dataService.manageError(e.message, "chapter-edit.component");
    }
  }

  private initChapter() {
    if (this.chapter == null) {
      this.chapter = new Chapter();
      this.chapter.title = '';
      this.chapter.content = null;
      this.tempContent = '';
      this.chapter.index = this.dataService.getSwChapterLastIndex();
      this.isNewChapter = true;
    }
    else {
      this.tempContent = this.chapter.content;
    }
  }

  private initNavigationParams() {
    this.story = this.dataService.getPwStory();
    if (this.story == null)
      this.location.back();
    this.chapter = this.dataService.getPwChapter();
    this.user = this.dataService.user;
  }

  private formNotify(event) {
    this.isEdited = true;
  }

  private backClicked() {
    this.location.back();
  }

  private editChapter() {
    try {
      this.doneDisabled = true;
      if (this.formError()) {
        if (this.isStoryShared()) {
          this.openConfirmDialog();
        } else {
          this.uploadChapter();
        }
      } else {
        this.doneDisabled = false;
      }
    } catch (e) {
      this.dataService.manageError(e.message, "chapter-edit.component");
    }
  }

  private openConfirmDialog() {
    let dialogRef = this.dialog.open(CreateSharedChapterDialogComponent, {
      width: '40%',
      data: { title: this.chapter.title }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.uploadChapter();
      }
      else {
        this.doneDisabled = false;
      }
    });
  }

  private isStoryShared() {
    return this.story.type != 'private';
  }

  private uploadChapter(): void {
    if (this.isNewChapter) {
      this.initNewChapter();

      this.createChapter();
    } else {
      this.chapter.dateEditing = new Date().getTime();
      this.chapter.content = this.tempContent;
      this.updateChapter();
    }
  }

  private updateChapter() {
    this.chapterService.updateChapter(this.chapter.$key, this.chapter).then(() => {
      this.story.dateEditing = new Date().getTime();
      this.storyService.updateStory(this.story.$key, this.story).then(() => {
        this.dataService.openCustomSnackBar('Chapter updated', 'info');
        this.location.back();
      });
    }).catch((error) => {
      this.doneDisabled = false;
    });
  }

  private createChapter() {
    this.chapterService.createChapter(this.chapter).then(() => {
      this.story.dateEditing = new Date().getTime();
      this.storyService.updateStory(this.story.$key, this.story).then(() => {
        this.dataService.openCustomSnackBar('Chapter created', 'info');
        this.location.back();
      });
    }).catch((error) => {
    });
  }

  private initNewChapter() {
    this.chapter.type = this.story.type;
    this.chapter.dateCreation = new Date().getTime();
    this.chapter.dateEditing = new Date().getTime();
    this.chapter.user = this.dataService.getAuthService.currentUserId;
    this.chapter.story = this.story.$key;
    this.chapter.content = this.tempContent;
    this.chapter.ratingSummary = new Rating();
    this.chapter.ratingSummary.user = this.chapter.user;
    this.chapter.ratingSummary.chapter = "";
    this.chapter.ratingSummary.dateEditing = new Date().getTime();
    this.chapter.ratingSummary.consistency = 0;
    this.chapter.ratingSummary.grammar = 0;
    this.chapter.ratingSummary.inspiration = 0;
    this.chapter.ratingSummary.lexicon = 0;
    this.chapter.ratingSummary.total = 0;
    this.chapter.ratingNumber = 0;
  }

  private textEditorChange(ev) {
    this.tempContent = ev;
  }

  private formError(): boolean {
    if (this.IsChapterTitleNull()) {
      this.dataService.openCustomSnackBar('Title is empty!', 'info');
      return false;
    }
    if (this.isContentNull()) {
      this.dataService.openCustomSnackBar('Content is empty!', 'info');
      return false;
    }
    return true;
  }

  private isContentNull() {
    return this.tempContent == null || this.tempContent.trim() == '';
  }

  private IsChapterTitleNull() {
    return this.chapter.title == null || this.chapter.title.trim() == '';
  }
}
