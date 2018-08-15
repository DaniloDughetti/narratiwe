import { Component, OnInit, Input } from '@angular/core';
import { Chapter } from '../../../../models/chapter';
import { User } from '../../../../models/user';
import { ChapterComment } from '../../../../models/chapterComment';
import { Rating } from '../../../../models/rating';
import { DataService } from '../../../../services/data.service';
import { ChapterCommentService } from '../../../../services/chapter-comment.service';
import { RatingService } from '../../../../services/rating.service';

@Component({
  selector: 'social-chapter',
  templateUrl: './social-chapter.component.html',
  styleUrls: ['./social-chapter.component.css']
})
export class SocialChapterComponent implements OnInit {

  @Input("chapter")
  private chapter: Chapter;
  private ratings: Rating[];
  private comments: ChapterComment[];
  private isLoading: boolean = true;
  private isLoadingComment: boolean = true;
  private isDataExisting: boolean = false;
  private commentsNumber: number = 0;

  constructor(private dataService: DataService,
    private chapterCommentService: ChapterCommentService,
    private ratingService: RatingService) { }

  ngOnInit() {
    this.initSocialChapter();
  }

  private initSocialChapter() {
    try {
      if (this.isChapterNull()) {
        this.initParams();
      }
      else {
        this.getRatingList();
        this.getCommentList();
        this.isDataExisting = true;
      }
    }
    catch (e) {
      this.dataService.manageError(e.message, "social-chapter.component");
    }
  }

  private getCommentList() {
    this.chapterCommentService.getChapterCommentList({
      orderByChild: 'chapter',
      equalTo: this.chapter.$key,
    }).subscribe((comments) => {
      this.setCommentList(comments);
    });
  }

  private setCommentList(comments: any) {
    this.comments = comments;
    this.commentsNumber = this.comments.length;
    this.isLoadingComment = false;
  }

  private getRatingList() {
    this.ratingService.getRatingList({
      orderByChild: 'chapter',
      equalTo: this.chapter.$key,
    }).subscribe((ratings) => {
      this.setRatingList(ratings);
    });
  }

  private setRatingList(ratings: any) {
    this.ratings = ratings;
    this.isLoading = false;
  }

  private initParams() {
    this.isDataExisting = false;
    this.isLoading = false;
  }

  private isChapterNull() {
    return this.chapter == null;
  }
}
