import { Component, OnInit, Input } from '@angular/core';
import { StoryService } from "../../../services/story.service";
import { DataService } from "../../../services/data.service";
import { Story } from "../../../models/story";
import { User } from "../../../models/user";
import { StoryUpsnumberPipe } from '../../../pipes/story-upsnumber.pipe';
import { CountryService } from '../../../services/country.service'

@Component({
  selector: 'social-list',
  templateUrl: './social-list.component.html',
  styleUrls: ['./social-list.component.css']
})
export class SocialListComponent implements OnInit {

  private stories: Story[];
  private showedMore: boolean = false;
  private isListLoading: boolean = true;
  @Input('initialRecords')
  private initialRecords: number;
  @Input('componentTitle')
  private componentTitle: string;
  @Input('showMoreButton')
  private showMoreButton: boolean;
  @Input('showLanguagesList')
  private showLanguagesList: boolean;
  @Input('isProfile')
  private isProfile: boolean;
  @Input('id')
  private id: string;
  @Input('type')
  private type: string;
  private isRatingMode: boolean = true;
  private tempRecords: number;
  private isLanguageOpen = false;
  private languageList: string[];
  private selectedLanguage: string;
  private isListEmpty = true;

  constructor(private dataService: DataService,
    private storyService: StoryService,
    private countryService: CountryService) { }

  ngOnInit() {
    this.initSocialList();
  }

  private initSocialList() {
    try {
      this.languageList = this.countryService.getLanguageNameListAll();
      this.selectedLanguage = 'All';
      this.isRatingMode = (this.type == 'ratings');

      if (!this.isProfile)
        this.getStoryListByLanguage();
      else
        this.getStoryListByUser();
    }
    catch (e) {
      this.dataService.manageError(e.message, "social-list");
    }
  }

  private getStoryListByUser() {
    this.storyService.getStoryList({
      orderByChild: 'user',
      equalTo: this.id
    }).subscribe((story) => {
      this.setStoryList(story);
    });
  }

  private setStoryList(story: Story[]) {
    let tempStories: Story[] = [];
    if (story != null) {
      for (let i = 0; i < story.length; i++) {
        if (this.isStorySharedAndVisible(story, i))
          tempStories.push(story[i]);
      }
    }
    this.stories = tempStories;
    this.tempRecords = this.initialRecords;
    this.isListLoading = false;
    this.isListEmpty = (this.stories.length == 0);
  }

  private isStorySharedAndVisible(story: Story[], i: number) {
    return !(story[i].type == 'private' && story[i].visibility == 'hidden');
  }

  private getStoryListByLanguage() {
    this.storyService.getStoryList({
      orderByChild: 'language'
    }).subscribe((story) => {
      this.setStoryList(story);
    });
  }

  private showMoreStories() {
    this.tempRecords = this.stories.length;
    this.showedMore = !this.showedMore;
  }

  private showLessStories() {
    this.tempRecords = this.initialRecords;
    this.showedMore = !this.showedMore;
  }

  private showStoryPreview(id: string): void {
    this.dataService.navigateWithParameter('/home/story-preview', id);
  }

  private onLanguageChanged(language) {
    try {
      this.selectedLanguage = language;
      this.getStories();
    } catch (e) {
      this.dataService.manageError(e.message, "social-list.component");
    }
  }

  private openLanguage() {
    this.isLanguageOpen = !this.isLanguageOpen;
  }

  private getStories() {
    if (this.selectedLanguage != 'All') {
      this.isListLoading = true;
      this.getStoryListBySpecificLanguage();
    } else {
      this.isListLoading = true;
      this.getStoryListByGeneralLanguage();
    }
  }

  private getStoryListByGeneralLanguage() {
    this.storyService.getStoryList({
      orderByChild: 'language'
    }).subscribe((story) => {
      let tempStories: Story[] = [];
      if (story != null) {
        for (let i = 0; i < story.length; i++) {
          if (this.isStorySharedAndVisible(story, i))
            tempStories.push(story[i]);
        }
      }
      this.stories = tempStories;
      this.tempRecords = this.initialRecords;
      this.isListLoading = false;
      this.isLanguageOpen = false;
      this.isListEmpty = (this.stories.length == 0);
    });
  }

  private getStoryListBySpecificLanguage() {
    this.storyService.getStoryList({
      orderByChild: 'language',
      equalTo: this.selectedLanguage
    }).subscribe((story) => {
      let tempStories: Story[] = [];
      if (story != null) {
        for (let i = 0; i < story.length; i++) {
          if (this.isStorySharedAndVisible(story, i))
            tempStories.push(story[i]);
        }
      }
      this.stories = tempStories;
      this.tempRecords = this.initialRecords;
      this.isListLoading = false;
      this.isLanguageOpen = false;
      this.isListEmpty = (this.stories.length == 0);
    });
  }
}
