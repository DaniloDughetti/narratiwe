import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../../../../models/story';
import { User } from '../../../../models/user';
import { StoryComment } from '../../../../models/storyComment';
import { DataService } from '../../../../services/data.service';
import { StoryCommentService } from '../../../../services/story-comment.service';

@Component({
  selector: 'social-story',
  templateUrl: './social-story.component.html',
  styleUrls: ['./social-story.component.css']
})
export class SocialStoryComponent implements OnInit {

  @Input("story")
  private story: Story;
  private comments: StoryComment[];
  private isLoading: boolean = true;
  private isLoadingComment: boolean = true;
  private isDataExisting: boolean = false;
  private commentsNumber: number = 0;

  constructor(private dataService: DataService,
    private storyCommentService: StoryCommentService) { }

  ngOnInit() {
    this.initStoryCommentList();
  }

  private initStoryCommentList() {
    try {
      if (this.isStoryNull()) {
        this.initEnvironmentParams();
      }
      else {
        this.getStoryCommentList();
        this.isDataExisting = true;
      }
    }
    catch (e) {
      this.dataService.manageError(e.message, "social-story.component");
    }
  }

  private isStoryNull() {
    return this.story == null;
  }

  private initEnvironmentParams() {
    this.isDataExisting = false;
    this.isLoading = false;
  }

  private getStoryCommentList() {
    this.storyCommentService.getStoryCommentList({
      orderByChild: 'story',
      equalTo: this.story.$key,
    }).subscribe((comments) => {
      this.comments = comments;
      this.commentsNumber = this.comments.length;
      this.isLoadingComment = false;
    });
  }
}
