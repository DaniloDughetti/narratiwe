import { Component, OnInit, Input } from '@angular/core';
import { StoryService } from "../../../services/story.service";
import { DataService } from "../../../services/data.service";
import { Story } from "../../../models/story";
import { User } from "../../../models/user";
import { StoryDateeditingPipe } from '../../../pipes/story-dateediting.pipe';

@Component({
  selector: 'favorite-stories-list',
  templateUrl: './favorite-stories-list.component.html',
  styleUrls: ['./favorite-stories-list.component.css']
})
export class FavoriteStoriesListComponent implements OnInit {

  private stories: Story[];
  private user: User;
  private showedMore: boolean = false;
  private isListLoading: boolean = true;
  @Input('initialRecords')
  private initialRecords: number;
  @Input('componentTitle')
  private componentTitle: string;
  @Input('showMoreButton')
  private showMoreButton: boolean;
  private tempRecords: number;
  private isDataExisting: boolean = false;

  constructor(private dataService: DataService,
    private storyService: StoryService) { }

  ngOnInit() {
    this.initFavoriteStoryList();
  }

  private initFavoriteStoryList() {
    try {
      this.user = this.dataService.user;
      if (this.isFavoriteStoryListNotEmpty())
        this.setStoryList();
      else
        this.initParams();
    }
    catch (e) {
      this.dataService.manageError(e.message, "favorite-stories-list.component");
    }
  }

  private initParams() {
    this.isDataExisting = false;
    this.isListLoading = false;
    this.showMoreButton = false;
  }

  private setStoryList() {
    this.stories = [];
    for (let i = 0; i < this.user.favoriteStories.length; i++) {
      this.getStory(i);
    }
    this.isDataExisting = true;
  }

  private getStory(i: number) {
    this.storyService.getStory(this.user.favoriteStories[i]).subscribe((story) => {
      this.stories.push(story);
      this.tempRecords = this.initialRecords;
      this.isListLoading = false;
      this.showMoreButton = !(this.stories.length <= this.tempRecords);
    });
  }

  private isFavoriteStoryListNotEmpty() {
    return this.user != null
      && this.user.favoriteStories != null
      && this.user.favoriteStories.length > 0;
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

}
