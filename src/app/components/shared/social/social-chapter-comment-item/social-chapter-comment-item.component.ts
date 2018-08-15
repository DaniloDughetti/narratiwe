import { Component, OnInit, Input } from '@angular/core';
import { Chapter } from '../../../../models/chapter';
import { User } from '../../../../models/user';
import { ChapterComment } from '../../../../models/chapterComment';
import { ChapterCommentService } from '../../../../services/chapter-comment.service';
import { UserService } from '../../../../services/user.service';
import { DataService } from '../../../../services/data.service';
import { MatInput } from '@angular/material';
import { UploadService } from '../../../../uploads/shared/upload.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'social-chapter-comment-item',
  templateUrl: './social-chapter-comment-item.component.html',
  styleUrls: ['./social-chapter-comment-item.component.css']
})
export class SocialChapterCommentItemComponent implements OnInit {

  @Input("chapterComment")
  public chapterComment: ChapterComment;

  public user: User;

  public profileImage: string;
  public isEditable: boolean = false;
  public isEditShow: boolean = false;
  public userNameCondition: boolean = false;

  public commentLabel: string;

  constructor(private dataService: DataService,
    private chapterCommentService: ChapterCommentService,
    private uploadService: UploadService,
    private userService: UserService) { }

  ngOnInit() {
    this.initCommentItem();
  }

  private initCommentItem() {
    try {
      this.getUser();
    }
    catch (e) {
      this.dataService.manageError(e.message, "social-chapter-comment-item.component");
    }
  }

  private getUser() {
    this.userService.getUser(this.chapterComment.user)
      .subscribe((user) => {
        this.user = user;
        this.userNameCondition = (this.isUserNameVisible());
        this.isEditable = (this.isCommentEditable());
        this.getUserImage();
      }), Error => {
        this.profileImage = null;
      };
  }

  private isCommentEditable(): boolean {
    return this.user.$key == this.dataService.getAuthService.currentUserId;
  }

  private getUserImage() {
    this.uploadService.getUserProfileImageUrl(this.user.$key).getDownloadURL()
      .then(url => {
        this.profileImage = url;
      }).catch(() => {
        this.profileImage = this.dataService.getDefaultUserImagePath("../../..");
      });
  }

  private isUserNameVisible(): boolean {
    return this.user.name != null && this.user.surname != null && this.user.name != '' && this.user.surname != '';
  }

  private editComment() {
    try {
      if (this.isCommentContentNotNull()) {
        this.dataService.openCustomSnackBar('Content is empty!', 'info');
        return false;
      } else
        this.updateComment();
    } catch (e) {
      this.dataService.manageError(e.message, "social-chapter-comment-item.component");
    }
  }

  private isCommentContentNotNull() {
    return this.chapterComment.content == null || this.chapterComment.content.trim() == '';
  }

  private updateComment() {
    this.chapterComment.dateEditing = new Date().getTime();
    this.chapterCommentService.updateChapterComment(this.chapterComment.$key, this.chapterComment)
      .then(() => {
        this.dataService.openCustomSnackBar('Chapter edited!', 'info');
      })
      .catch((error) => {
        this.dataService.openCustomSnackBar('Chapter not edited!', 'info');
      });
  }

  private deleteComment() {
    try {
      this.chapterCommentService.deleteChapterComment(this.chapterComment.$key)
        .then(() => {
          this.dataService.openCustomSnackBar('Chapter deleted!', 'info');          
        })
        .catch((error) => {
          this.dataService.openCustomSnackBar('Chapter deleted!', 'info');          
        });
    } catch (e) {
      this.dataService.manageError(e.message, "social-chapter-comment-item.component");
    }
  }

  private showEditComment() {
    this.isEditShow = !this.isEditShow;
  }

  private viewUser() {
    this.dataService.navigateWithParameter('/home/profile/view-general', this.user.$key);
  }
}
