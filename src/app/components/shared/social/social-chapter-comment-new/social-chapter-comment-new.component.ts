import { Component, OnInit, Input } from '@angular/core';
import { Chapter } from '../../../../models/chapter';
import { User } from '../../../../models/user';
import { ChapterComment } from '../../../../models/chapterComment';
import { ChapterCommentService } from '../../../../services/chapter-comment.service';
import { DataService } from '../../../../services/data.service';
import { MatInput } from '@angular/material';

@Component({
  selector: 'social-chapter-comment-new',
  templateUrl: './social-chapter-comment-new.component.html',
  styleUrls: ['./social-chapter-comment-new.component.css']
})
export class SocialChapterCommentNewComponent implements OnInit {

  @Input("chapter")
  private chapter: Chapter;
  private user: User;
  private profileImage: string;
  private content: string = '';
  private commentLabel: string;
  private publishDisabled: boolean = false;

  constructor(private dataService: DataService,
    private chapterCommentService: ChapterCommentService) { }

  ngOnInit() {
    this.initUserComment();
  }

  private initUserComment() {
    try {
      this.getUserInfo();
    }
    catch (e) {
      this.dataService.manageError(e.message, "social-chapter-comment-new.component");
    }
  }

  private getUserInfo() {
    this.profileImage = this.dataService.getPwUserImage();
    this.user = this.dataService.user;
  }

  private createComment(): boolean {
    try {
      this.publishDisabled = true;

      if (this.isContentNull()) {
        this.publishDisabled = false;
        this.dataService.openCustomSnackBar('Content is empty!', 'info');        
        return false;
      } else {
        this.uploadComment();
      }
    } catch (e) {
      this.publishDisabled = false;
      this.dataService.manageError(e.message, "social-chapter-comment-new.component");
    }
  }

  private uploadComment() {
    let chapterComment: ChapterComment = this.initComment();
    this.sendComment(chapterComment);
  }

  private sendComment(chapterComment: ChapterComment) {
    this.chapterCommentService.createChapterComment(chapterComment)
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

  private initComment() {
    let chapterComment: ChapterComment;
    chapterComment = new ChapterComment();
    chapterComment.content = this.content;
    chapterComment.dateEditing = new Date().getTime();
    chapterComment.chapter = this.chapter.$key;
    chapterComment.user = this.user.$key;
    return chapterComment;
  }

  private isContentNull() {
    return this.content == null || this.content.trim() == '';
  }
}
