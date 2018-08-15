import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../services/data.service";
import { Search } from "../../../models/search";
import { CountryService } from "../../../services/country.service";
import { StoryService } from "../../../services/story.service";
import { Location } from '@angular/common';
import { Story } from "../../../models/story";
import { User } from "../../../models/user";
import { ChapterService } from "../../../services/chapter.service";

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  private search: Search;
  private isSearchAdvanced: boolean = false;
  private showedMore: boolean = false;
  private languageList: string[];
  private selectedLanguage: string;
  private selectedKind: string;
  private kindList: any;
  private searchLabel: string;
  private isLoading: boolean = true;
  private stories: Story[];
  private user: User;
  private isListLoading: boolean = true;
  private isDataExisting: boolean = false;

  constructor(private dataService: DataService,
    private countryService: CountryService,
    private storyService: StoryService,
    private location: Location) { }

  ngOnInit() {
    this.initSearchResult();
  }

  private initSearchResult() {
    try {
      this.search = this.dataService.getPwSearch();
      if (this.search == null) {
        this.location.back();
      }
      else {
        this.languageList = this.countryService.getLanguageNameList();
        this.kindList = this.storyService.getKindList(this.dataService.user.systemLanguage);
        if (this.search.isAdvanced) {
          this.showMoreStories();
          this.onLanguageChanged(this.search.language);
          this.selectedKind = this.search.kind;
        }
        else {
          this.selectedKind = 'kind-0';
          this.selectedLanguage = 'None';
        }
        this.stories = [];
        this.user = this.dataService.user;
        if (this.search != null) {
          this.searchStories();
        }
        else {
          this.isListLoading = false;
          this.isDataExisting = false;
        }
      }
    }
    catch (e) {
      this.dataService.manageError(e.message, "search-result.component");
    }
  }

  private onLanguageChanged(language) {
    this.selectedLanguage = language;
    this.search.language = this.selectedLanguage;
  }

  private searchClicked() {
    try {
      this.isListLoading = true;
      this.isDataExisting = false;

      if (this.isSearchNotAdvanced()) {
        this.dataService.openCustomSnackBar('Title cannot be empty', 'info');
        this.isListLoading = false;
      } else {
        if (this.isSearchAdvancedButNoMoreParametersSelected()) {
          this.dataService.openCustomSnackBar('You have selected no more parameters', 'info');          
          this.isListLoading = false;
        }
        else
          this.searchStories();
      }
    } catch (e) {
      this.dataService.manageError(e.message, "search-result.component");
    }
  }

  private isSearchAdvancedButNoMoreParametersSelected() {
    return this.search.isAdvanced && this.selectedLanguage == 'None' && this.selectedKind == 'kind-0';
  }

  private isSearchNotAdvanced() {
    return !this.search.isAdvanced && this.search.title == '';
  }

  private onKindChanged(kind) {
    this.selectedKind = kind;
    this.search.kind = this.selectedKind;
  }

  private showMoreStories() {
    this.isSearchAdvanced = !this.isSearchAdvanced;
    this.search.isAdvanced = this.isSearchAdvanced;
    this.showedMore = !this.showedMore;
  }

  private showLessStories() {
    this.isSearchAdvanced = !this.isSearchAdvanced;
    this.search.isAdvanced = this.isSearchAdvanced;
    this.showedMore = !this.showedMore;
  }

  private searchStories() {
    if (!this.search.isAdvanced) {
      this.GetStoryListGeneric();
    } else {
      //Only title
      if (this.isSelectedOnlyTitle()) {
        this.getStoryListByTitle();
      } else
        //Only kind
        if (this.isSelectedOnlyKind()) {
          this.getStoryListByKind();
        } else
          //Only language
          if (this.isSelectedOnlyLanguage()) {
            this.getStoryListByLanguage();
          } else
          //All
          {
            this.getStoryListByAll();
          }
    }
  }

  private isSelectedOnlyTitle() {
    return this.search.title != '' &&
      this.search.kind == 'kind-0' &&
      this.search.language == 'None';
  }

  private isSelectedOnlyKind() {
    return this.search.title == '' &&
      this.search.kind != 'kind-0' &&
      this.search.language == 'None';
  }

  private isSelectedOnlyLanguage() {
    return this.search.title == '' &&
      this.search.kind == 'kind-0' &&
      this.search.language != 'None';
  }

  private getStoryListByAll() {
    this.storyService.getStoryList({
      orderByChild: 'title',
      startAt: this.search.title,
      endAt: this.search.title + "\uf8ff"
    }).subscribe((story) => {
      let tempStory: Story[] = [];
      if (story != null)
        for (let i = 0; i < story.length; i++) {
          if (story[i].kind == this.search.kind &&
            story[i].language == this.search.language &&
            !(story[i].type == 'private' && story[i].visibility == 'hidden')) {
            tempStory.push(story[i]);
          }
        }
      this.stories = tempStory;
      this.isListLoading = false;
      this.isDataExisting = (tempStory != null && tempStory.length != 0);
      this.isLoading = false;
    });
  }

  private getStoryListByLanguage() {
    this.storyService.getStoryList({
      orderByChild: 'language',
      equalTo: this.search.language
    }).subscribe((story) => {
      this.setStoryList(story);
    });
  }

  private setStoryList(story: Story[]) {
    let tempStories: Story[] = [];
    if (story != null) {
      for (let i = 0; i < story.length; i++) {
        if (!(story[i].type == 'private' && story[i].visibility == 'hidden'))
          tempStories.push(story[i]);
      }
    }
    this.stories = tempStories;
    this.isListLoading = false;
    this.isLoading = false;
    this.isDataExisting = (story != null && story.length != 0);
  }

  private getStoryListByKind() {
    this.storyService.getStoryList({
      orderByChild: 'kind',
      equalTo: this.search.kind
    }).subscribe((story) => {
      this.setStoryList(story);
    });
  }

  private getStoryListByTitle() {
    this.storyService.getStoryList({
      orderByChild: 'title',
      startAt: this.search.title,
      endAt: this.search.title + "\uf8ff"
    }).subscribe((story) => {
      this.setStoryList(story);
    });
  }

  private GetStoryListGeneric() {
    this.storyService.getStoryList({
      orderByChild: 'title',
      startAt: this.search.title,
      endAt: this.search.title + "\uf8ff"
    }).subscribe((story) => {
      this.setStoryList(story);
    });
  }

  private backClicked() {
    this.location.back();
  }
  
  private showStoryPreview(id: string): void {
    this.dataService.navigateWithParameter('/home/story-preview', id);
  }
}
