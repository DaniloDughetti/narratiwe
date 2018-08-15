import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { StoryService } from "../../../services/story.service";
import { ChapterService } from "../../../services/chapter.service";
import { UserService } from "../../../services/user.service";
import { CountryService } from '../../../services/country.service';
import { Story } from "../../../models/story";
import { User } from "../../../models/user";
import { Chapter } from "../../../models/chapter";
import { UploadService } from '../../../uploads/shared/upload.service';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteDialogComponent } from '../../dialogs/delete-dialog/delete-dialog.component'
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'story-edit-preview',
  templateUrl: './story-edit-preview.component.html',
  styleUrls: ['./story-edit-preview.component.css']
})
export class StoryEditPreviewComponent implements OnInit {

  private story: Story;
  private user: User;
  private selectedKind: string;
  private kindList: any;
  private languageList: string[];
  private selectedLanguage: string;
  private isImageUploaded: boolean = false;
  private imageUUID: string;
  private isEdited: boolean = false;
  private isLoading: boolean = true;

  constructor(private dataService: DataService,
    private location: Location,
    private storyService: StoryService,
    private chapterService: ChapterService,
    private userService: UserService,
    private uploadService: UploadService,
    private countryService: CountryService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.setStory();
  }

  private setStory() {
    try {
      this.setStoryParams();
    }
    catch (e) {
      this.dataService.manageError(e.message, "story-edit-preview.component");
    }
  }

  private setStoryParams() {
    this.setNavigation();
    this.setStoryLanguage();
    this.setStoryKind();
    this.imageUUID = UUID.UUID();
  }

  private setStoryKind() {
    this.kindList = this.storyService.getKindList(this.dataService.user.systemLanguage);
    this.selectedKind = this.story.kind;
  }

  private setStoryLanguage() {
    this.selectedLanguage = this.story.language;
    this.languageList = this.countryService.getLanguageNameList();
    this.onLanguageChanged(this.selectedLanguage);
  }

  private setNavigation() {
    this.story = this.dataService.getPwStory();
    this.user = this.dataService.getPwUser();
    if (this.story == null || this.story.title == null || this.user == null) {
      this.location.back();
      this.isLoading = true;
    }
    else {
      this.isLoading = false;
    }
  }

  formNotify(event) {
    this.isEdited = true;
  }

  backClicked() {
    this.location.back();
  }

  onLanguageChanged(language) {
    this.isEdited = true;
    this.selectedLanguage = language;
  }

  onKindChanged(kind) {
    this.isEdited = true;
    this.selectedKind = kind;
  }

  updateStory() {
    try {
      if (this.isEdited && this.formError()) {
        this.confirmEditingStory();
      }
    } catch (e) {
      this.dataService.manageError(e.message, "story-edit-preview.component");
    }
  }

  private confirmEditingStory() {
    this.preUploadStoryEditing();
    this.uploadStory();
  }

  private preUploadStoryEditing() {
    this.story.kind = this.selectedKind;
    this.story.dateEditing = new Date().getTime();
    if (this.isImageUploaded) {
      this.story.image = this.imageUUID;
    }
  }

  private uploadStory() {
    this.storyService.updateStory(this.story.$key, this.story).then(() => {
      this.dataService.openCustomSnackBar('Story updated', 'info');
      this.location.back();
    }).catch((error) => {
      this.location.back();
    });
  }

  openDeleteDialog() {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '40%',
      data: { title: this.story.title }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteStory();
      }
    });
  }

  deleteStory() {
    try {
      let storyKey = this.story.$key;
      this.getChapterList(storyKey);
    } catch (e) {
      this.dataService.manageError(e.message, "story-edit-preview.component");
    }
  }

  private getChapterList(storyKey: string) {
    this.chapterService.getChaptersList({
      orderByChild: 'story',
      equalTo: storyKey
    }).subscribe((chapters) => {
      //Elimino i capitoli
      this.deleteChapters(chapters);
      //Elimino preferenze e storia letture
      this.updateUser(storyKey);
    });
  }

  private updateUser(storyKey: string) {
    this.setUserFavorites(storyKey);
    this.uploadUser(storyKey);
  }

  private setUserFavorites(storyKey: string) {
    this.user = this.userService.removeFavorites(this.user, storyKey);
    this.user = this.userService.removeChapterRead(this.user, storyKey);
  }

  private uploadUser(storyKey: string) {
    this.userService.updateUser(this.user.$key, this.user)
      .then(() => {
        this.storyService.deleteStory(storyKey).then(() => {
          this.dataService.openCustomSnackBar('Story deleted', 'info');
          this.dataService.navigate("/home/write");
        }).catch((error) => {
          this.location.back();
        });
      })
      .catch((error) => {
      });
  }

  private deleteChapters(chapters: Chapter[]) {
    if (chapters != null && chapters.length > 0)
      for (let i = 0; i < chapters.length; i++)
        this.chapterService.deleteChapter(chapters[i].$key).catch((error) => console.log(error));
  }

  private imageUploadEmitter(ev) {
    this.isEdited = true;
    this.isImageUploaded = ev;
  }

  private formError(): boolean {
      if (this.isStoryTitleEmpty()) {
        this.dataService.openCustomSnackBar('Title is empty!', 'info');
        return false;
      }
      if (this.isStoryDescriptionEmpty()) {
        this.dataService.openCustomSnackBar('Description is empty!', 'info');
        return false;
      }
      if (this.isStoryLanguageEmpty()) {
        this.dataService.openCustomSnackBar('Language is empty!', 'info');
        return false;
      }    
    return true;
  }

  private isStoryLanguageEmpty() {
    return this.selectedLanguage == null || this.selectedLanguage.trim() == '';
  }

  private isStoryDescriptionEmpty() {
    return this.story.description == null || this.story.description.trim() == '';
  }

  private isStoryTitleEmpty() {
    return this.story.title == null || this.story.title.trim() == '';
  }
}
