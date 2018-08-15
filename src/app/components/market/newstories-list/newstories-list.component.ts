import { Component, OnInit, Input } from '@angular/core';
import { StoryService } from "../../../services/story.service";
import { DataService } from "../../../services/data.service";
import { Story } from "../../../models/story";
import { User } from "../../../models/user";
import { StoryDatepublishedPipe } from '../../../pipes/story-datepublished.pipe';
import { CountryService } from '../../../services/country.service';

@Component({
  selector: 'newstories-list',
  templateUrl: './newstories-list.component.html',
  styleUrls: ['./newstories-list.component.css']
})
export class NewstoriesListComponent implements OnInit {

  private stories: Story[];
  private user: User;
  private showedMore: boolean = false;
  private isListLoading: boolean = true;
  private isLanguageOpen = false;
  private languageList: string[];
  private selectedLanguage: string;
  @Input('initialRecords')
  private initialRecords: number;
  @Input('componentTitle')
  private componentTitle: string;
  @Input('showMoreButton')
  private showMoreButton: boolean;
  @Input('type')
  private type: string;
  private tempRecords: number;
  private isListEmpty = true;

  constructor(private dataService: DataService,
    private storyService: StoryService,
    private countryService: CountryService) { }
  
  ngOnInit() {
    this.initNewStoriesList();
  }

  private initNewStoriesList() {
    try {
      this.setStoryType();
      this.user = this.dataService.user;
      this.languageList = this.countryService.getLanguageNameListAll();
      this.setLanguage();
      this.selectedLanguage = this.user.storyLanguage;
      if (this.selectedLanguage != 'All')
        this.getStoryListByGeneralLanguage();
      else
        this.getStoryListBySpecificLanguage();
    }
    catch (e) {
      this.dataService.manageError(e.message, "newstories-list.component");
    }
  }

  private getStoryListByGeneralLanguage() {
    this.storyService.getStoryList({
      orderByChild: 'language'
    }).subscribe((story) => {
      this.setStoryList(story);
    });
  }

  private getStoryListBySpecificLanguage() {
    this.storyService.getStoryList({
      orderByChild: 'language',
      equalTo: this.user.storyLanguage
    }).subscribe((story) => {
      this.setStoryList(story);
    });
  }

  private setStoryList(story: Story[]) {
    let tempStories: Story[] = [];
    if (story != null) {
      if (this.type == 'private') {
        for (let i = 0; i < story.length; i++) {
          if (story[i].type == 'private' && story[i].visibility != 'hidden')
            tempStories.push(story[i]);
        }
      }
      else {
        for (let i = 0; i < story.length; i++) {
          if (story[i].type != 'private')
            tempStories.push(story[i]);
        }
      }
    }
    this.stories = tempStories;
    this.isListEmpty = (this.stories.length == 0);
    this.showMoreButton = !this.isListEmpty;
    this.tempRecords = this.initialRecords;
    this.isListLoading = false;
  }

  private setLanguage() {
    if (this.user.storyLanguage == null) {
      this.user.storyLanguage == 'English';
    }
  }

  private setStoryType() {
    if (this.type != 'shared')
      this.type = "private";
  }

  private onLanguageChanged(language) {
    try {
      this.selectedLanguage = language;
      this.getStories();
    } catch (e) {
      this.dataService.manageError(e.message, "newstories-list.component");
    }
  }

  private showMoreStories() {
    this.tempRecords = 10;
    this.showedMore = !this.showedMore;
  }

  private showLessStories() {
    this.tempRecords = this.initialRecords;
    this.showedMore = !this.showedMore;
  }

  private showStoryPreview(id: string): void {
    this.dataService.navigateWithParameter('/home/story-preview', id);
  }

  private openLanguage() {
    this.isLanguageOpen = !this.isLanguageOpen;
  }

  private getStories() {

    this.isListLoading = true;
    if (this.selectedLanguage != 'All')
      this.getStoryListBySpecificLanguage();
    else 
      this.getStoryListByGeneralLanguage();
    this.isLanguageOpen = false;
  }
}