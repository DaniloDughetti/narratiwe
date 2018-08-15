import { Component, OnInit, Input } from '@angular/core';
import { StoryService } from "../../../../services/story.service";
import { DataService } from "../../../../services/data.service";
import { Story } from "../../../../models/story";
import { User } from "../../../../models/user";
import { StoryDateeditingPipe } from '../../../../pipes/story-dateediting.pipe';

@Component({
  selector: 'mystories-list',
  templateUrl: './mystories-list.component.html',
  styleUrls: ['./mystories-list.component.css']
})
export class MystoriesListComponent implements OnInit {

  private stories: Story[];
  private showedMore: boolean = false;
  private isListLoading: boolean = true;
  private isDataExisting: boolean = false;
  @Input('user')
  private user: User;
  @Input('initialRecords')
  private initialRecords: number;
  @Input('componentTitle')
  private componentTitle: string;
  @Input('showMoreButton')
  private showMoreButton: boolean;
  @Input('showPublished')
  private showPublished: boolean;
  private tempRecords: number;

  constructor(private dataService: DataService,
    private storyService: StoryService) { }

  ngOnInit() {

    this.getStoryList();

  }

  private getStoryList() {
    try {
      this.storyService.getStoryList({
        orderByChild: 'user',
        equalTo: this.user.$key,
      }).subscribe((story) => {
        this.setStoryList(story);
      });
    } catch (e) {
      this.dataService.manageError(e.message, "mystories-list.component");
    }
  }

  private setStoryList(story: Story[]) {
    let tempStories: Story[] = [];
    if (story != null) {
      if (!this.showPublished) {
        for (let i = 0; i < story.length; i++) {
          if (!this.isStoryPrivate(story, i))
            tempStories.push(story[i]);
        }
      }
      else {
        tempStories = story;
      }
    }
    this.updateEnvironment(tempStories);
  }

  private updateEnvironment(tempStories: Story[]) {
    this.stories = tempStories;
    this.isDataExisting = (this.isStoryListNotEmpty());
    this.tempRecords = this.initialRecords;
    this.isListLoading = false;
  }

  private isStoryListNotEmpty(): boolean {
    return this.stories != null && this.stories.length > 0;
  }

  private isStoryPrivate(story: Story[], i: number) {
    return story[i].type != 'private' ||
      (story[i].type == 'private' && story[i].visibility != 'hidden');
  }

  showMoreStories() {
    this.tempRecords = this.stories.length;
    this.showedMore = !this.showedMore;
  }

  showLessStories() {
    this.tempRecords = this.initialRecords;
    this.showedMore = !this.showedMore;
  }


  showStoryPreview(id: string): void {
    this.dataService.navigateWithParameter('/home/story-preview', id);
  }

}
