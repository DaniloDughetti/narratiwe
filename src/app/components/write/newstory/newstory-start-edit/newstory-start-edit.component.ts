import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { StoryService } from '../../../../services/story.service';
import { CountryService } from '../../../../services/country.service';
import { User } from '../../../../models/user';
import { Story } from '../../../../models/story';
import { Rating } from '../../../../models/rating';
import { UUID } from 'angular2-uuid';
import { Location } from '@angular/common';
import { Upload } from '../../../../uploads/shared/upload';

@Component({
  selector: 'newstory-start-edit',
  templateUrl: './newstory-start-edit.component.html',
  styleUrls: ['./newstory-start-edit.component.css']
})
export class NewstoryStartEditComponent implements OnInit, OnDestroy {

  private type: string;
  private sub: any;
  private story: Story;
  private title: string;
  private description: string;
  private dateCreation: Date;
  private dateEditing: Date;
  private selectedKind: string;
  private kindList: any;
  private languageList: string[];
  private selectedLanguage: string;
  private user: User;
  private isImageUploaded: boolean = false;
  private imageUUID: string;
  private currentUpload: Upload;
  private doneDisabled: boolean = false;

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private countryService: CountryService,
    private storyService: StoryService,
    private location: Location) { }

  ngOnInit() {
    try {
      this.user = this.dataService.user;      
      this.initStory();
    } catch (e) {
      this.dataService.manageError(e.message, "newstory-start-edit.component");
    }
  }

  private initStory() {
    this.languageList = this.countryService.getLanguageNameList();
    this.setStorySystemLanguage();
    this.setStoryKind();
    this.setStoryType();
    this.imageUUID = UUID.UUID();
  }

  private setStoryType() {
    this.sub = this.route.params.subscribe(params => {
      this.type = params['type'];
      if (this.type != 'private' &&
        this.type != 'shared')
        this.type != 'private';
    });
  }

  private setStoryKind() {
    this.kindList = this.storyService.getKindList(this.dataService.user.systemLanguage);
    this.selectedKind = 'kind-0';
  }

  private setStorySystemLanguage() {
    if (this.user != null && this.user.language != null) {
      if (this.user.systemLanguage != null && this.user.systemLanguage == "Italian")
        this.selectedLanguage = 'Italian';
      else
        this.selectedLanguage = 'English';
    }
    else {
      this.selectedLanguage = 'English';
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onLanguageChanged(language) {
    this.selectedLanguage = language;
  }

  onKindChanged(kind) {
    this.selectedKind = kind;
  }

  createStory() {
    try {
      this.doneDisabled = true;
      if (this.isFormCorrect()) {
        this.initNewStoryParams();
        this.createNewStory();
      }else{
        this.doneDisabled = false;
      }
    } catch (e) {
      this.dataService.manageError(e.message, "newstory-start-edit.component");
    }
  }

  private initNewStoryParams() {
    this.setNewStoryParams();
    this.setNewStoryVisibility();
    this.setNewStoryDatePublished();
    this.setNewStoryImage();
    this.setNewStoryRating();
    this.setNewStoryUp();
  }

  private createNewStory() {
    //Hot to revert: console.log("->" + new Date(this.story.dateCreation).toLocaleString());
    this.storyService.createStory(this.story).then(() => {
      if (this.dataService.user.systemLanguage != null && this.dataService.user.systemLanguage == "Italian")
        this.dataService.openCustomSnackBar('Story created', 'info');
      this.dataService.navigate("/home/write/write-home");
      this.doneDisabled = false;
    }).catch((error) => {
      this.doneDisabled = false;
    });
  }

  private setNewStoryUp() {
    this.story.upsNumber = 0;
  }

  private setNewStoryRating() {
    this.story.ratingSummary = new Rating();
    this.story.ratingSummary.user = this.user.$key;
    this.story.ratingSummary.chapter = "";
    this.story.ratingSummary.dateEditing = new Date().getTime();
    this.story.ratingSummary.consistency = 0;
    this.story.ratingSummary.grammar = 0;
    this.story.ratingSummary.inspiration = 0;
    this.story.ratingSummary.lexicon = 0;
    this.story.ratingSummary.total = 0;
    this.story.ratingNumber = 0;
  }

  private setNewStoryDatePublished() {
    this.story.datePublished = new Date().getTime();
  }

  private setNewStoryImage() {
    if (this.isImageUploaded) {
      this.story.image = this.imageUUID;
    }
    else {
      this.story.image = '';
    }
  }

  private setNewStoryVisibility() {
    if (this.story.type == 'private') {
      this.story.visibility = 'hidden';
    }
    else {
      this.story.visibility = 'visible';
    }
  }

  private setNewStoryParams() {
    this.story = new Story();
    this.story.title = this.title;
    this.story.description = this.description;
    this.story.type = this.type;
    this.story.kind = this.selectedKind;
    this.story.dateCreation = new Date().getTime();
    this.story.dateEditing = new Date().getTime();
    this.story.user = this.user.$key;
    this.story.language = this.selectedLanguage;
  }

  private imageUploadEmitter(ev) {
    this.currentUpload = ev;
    this.isImageUploaded = true;
  }

  private isFormCorrect(): boolean {
      if (this.isUploadNotFinished()) {
        this.dataService.openCustomSnackBar('Wait the image upload end!', 'info');
        return false;
      }
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
    return this.description == null || this.description.trim() == '';
  }

  private isStoryTitleEmpty() {
    return this.title == null || this.title.trim() == '';
  }

  private isUploadNotFinished() {
    return this.currentUpload != null && this.currentUpload.progress < 100;
  }

  backClicked() {
    this.location.back();
  }

}
