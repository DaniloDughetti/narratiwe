import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../../../../models/story';
import { User } from '../../../../models/user';
import { StoryComment } from '../../../../models/storyComment';
import { StoryCommentService } from '../../../../services/story-comment.service';
import { DataService } from '../../../../services/data.service';
import { MatInput } from '@angular/material';

@Component({
  selector: 'social-story-comment-new',
  templateUrl: './social-story-comment-new.component.html',
  styleUrls: ['./social-story-comment-new.component.css']
})
export class SocialStoryCommentNewComponent implements OnInit {

  @Input("story")
  private story: Story;
  private user: User;
  private profileImage: string;
  private content: string = '';
  private commentLabel: string;
  private publishDisabled: boolean = false;

  constructor(private dataService: DataService,
    private storyCommentService: StoryCommentService) { }

  ngOnInit() {
    this.initParams();
  }

  private initParams() {
    this.profileImage = this.dataService.getPwUserImage();
    this.user = this.dataService.user;
  }

  createComment() {
    try {
      this.publishDisabled = true;
      if (this.content.trim() == '') {
        this.publishDisabled = false;
        this.dataService.openCustomSnackBar('Content is empty!', 'info');      
        return false;
      } else {
        let storyComment: StoryComment = this.setStoryComment();
        this.uploadStory(storyComment);
      }
    } catch (e) {
      this.manageError(e);
    }
  }

  private manageError(e: any) {
    this.publishDisabled = false;
    this.dataService.manageError(e.message, "social-story-comment-new.component");
  }

  private setStoryComment() {
    let storyComment: StoryComment;
    storyComment = new StoryComment();
    storyComment.content = this.content;
    storyComment.dateEditing = new Date().getTime();
    storyComment.story = this.story.$key;
    storyComment.user = this.dataService.getAuthService.currentUserId;
    return storyComment;
  }

  private uploadStory(storyComment: StoryComment) {
    this.storyCommentService.createStoryComment(storyComment)
      .then(() => {
        this.publishDisabled = false;
        this.dataService.openCustomSnackBar('Comment published!', 'info');
        this.content = '';
      })
      .catch((error) => {
        this.publishDisabled = false;
        this.dataService.openCustomSnackBar('Comment not published!', 'info');
      });
  }
}
