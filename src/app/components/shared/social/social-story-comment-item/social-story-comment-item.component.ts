import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../../../../models/story';
import { User } from '../../../../models/user';
import { StoryComment } from '../../../../models/storyComment';
import { StoryCommentService } from '../../../../services/story-comment.service';
import { UserService } from '../../../../services/user.service';
import { DataService } from '../../../../services/data.service';
import { MatInput } from '@angular/material';
import { UploadService } from '../../../../uploads/shared/upload.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'social-story-comment-item',
  templateUrl: './social-story-comment-item.component.html',
  styleUrls: ['./social-story-comment-item.component.css']
})
export class SocialStoryCommentItemComponent implements OnInit {

  @Input("storyComment")
  private storyComment: StoryComment;
  private user: User;
  private profileImage: string;
  private isEditable: boolean = false;
  private isEditShow: boolean = false;
  private userNameCondition: boolean = false;
  private commentLabel: string;

  constructor(private dataService: DataService,
    private storyCommentService: StoryCommentService,
    private uploadService: UploadService,
    private userService: UserService) { }

  ngOnInit() {
    this.setStoryCommentItem();
  }

  private setStoryCommentItem() {
    try {
      this.getUser();
    }
    catch (e) {
      this.dataService.manageError(e.message, "social-story-comment-item.component");
    }
  }

  private getUser() {
    this.userService.getUser(this.storyComment.user)
      .subscribe((user) => {
        this.user = user;
        this.userNameCondition = (this.isUserNameSetted());
        this.isEditable = (this.isStoryEditable());
        this.getUserImage();
      }), Error => {
        this.profileImage = null;
      };
  }

  private isStoryEditable(): boolean {
    return this.user.$key == this.dataService.getAuthService.currentUserId;
  }

  private isUserNameSetted(): boolean {
    return this.user.name != null && this.user.surname != null && this.user.name != '' && this.user.surname != '';
  }

  private getUserImage() {
    this.uploadService.getUserProfileImageUrl(this.user.$key).getDownloadURL()
      .then(url => {
        this.profileImage = url;
      }).catch(() => {
        this.profileImage = this.dataService.getDefaultUserImagePath("../../..");
      });
  }

  editComment() {
    try {
      if (this.storyComment.content.trim() == '') {
        this.dataService.openCustomSnackBar('Content is empty!', 'info');
        return false;
      } else {
        this.storyComment.dateEditing = new Date().getTime();
        this.updateStoryComment();
      }
    } catch (e) {
      this.dataService.manageError(e.message, "social-story-comment-item.component");
    }
  }

  private updateStoryComment() {
    this.storyCommentService.updateStoryComment(this.storyComment.$key, this.storyComment)
      .then(() => {
        this.dataService.openCustomSnackBar('Comment edited!', 'info');
      })
      .catch((error) => {
        this.dataService.openCustomSnackBar('Comment not edited!', 'info');
      });
  }

  deleteComment() {
    try {
      this.deleteStoryComment();
    } catch (e) {
      this.dataService.manageError(e.message, "social-story-comment-item.component");
    }
  }

  private deleteStoryComment() {
    this.storyCommentService.deleteStoryComment(this.storyComment.$key)
      .then(() => {
        this.dataService.openCustomSnackBar('Comment deleted!', 'info');
      })
      .catch((error) => {
        this.dataService.openCustomSnackBar('Comment not deleted!', 'info');
      });
  }

  showEditComment() {
    this.isEditShow = !this.isEditShow;
  }

  viewUser() {
    this.dataService.navigateWithParameter('/home/profile/view-general', this.user.$key);
  }

}
