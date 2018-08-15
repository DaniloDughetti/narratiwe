import { Component, OnInit, Input } from '@angular/core';
import { Chapter } from '../../../../models/chapter';
import { Story } from '../../../../models/story';
import { User } from '../../../../models/user';
import { Rating } from '../../../../models/rating';
import { DataService } from '../../../../services/data.service';
import { RatingService } from '../../../../services/rating.service';
import { ChapterService } from '../../../../services/chapter.service';

@Component({
  selector: 'social-chapter-summary',
  templateUrl: './social-chapter-summary.component.html',
  styleUrls: ['./social-chapter-summary.component.css']
})
export class SocialChapterSummaryComponent implements OnInit {

  @Input("story")
  private story: Story;
  @Input("chapter")
  private chapter: Chapter;
  private isLoading: boolean = true;
  private isDataExisting: boolean = false;
  private isAlreadyRated: boolean = false;
  private ratingUser: Rating;
  private ratingSummary: Rating;

  constructor(private dataService: DataService,
    private ratingService: RatingService,
    private chapterService: ChapterService) { }

  ngOnInit() {
    this.initChapterSummary();
  }
  
  private initChapterSummary() {
    try {
      if (this.isStoryOrChapterNull()) {
        this.initParams();
      }
      else {
        this.getRatingList();
      }
    }
    catch (e) {
      this.dataService.manageError(e.message, "social-chapter-summary.component");
    }
  }

  private initParams() {
    this.isDataExisting = false;
    this.isLoading = false;
  }

  private isStoryOrChapterNull() {
    return this.story == null || this.chapter == null;
  }

  private getRatingList() {
    this.ratingService.getRatingList({
      orderByChild: 'chapter',
      equalTo: this.chapter.$key,
    }).subscribe((ratings) => {
      if (ratings != null && ratings.length > 0)
        for (let i = 0; i < ratings.length; i++) {
          if (ratings[i].user == this.dataService.user.$key) {
            this.ratingUser = ratings[i];
            this.isAlreadyRated = true;
            break;
          }
        }
      if (!this.isAlreadyRated)
        this.initRating();
      else
        this.getChapter();
    });
  }

  private getChapter() {
    this.chapterService.getChapter(this.chapter.$key).subscribe((chapter) => {
      this.chapter = chapter;
      this.ratingSummary = chapter.ratingSummary;
      this.isDataExisting = true;
      this.isLoading = false;
    });
    this.ratingSummary = this.chapter.ratingSummary;
  }

  private initRating() {
    this.ratingUser = new Rating();
    this.ratingUser.user = this.dataService.user.$key;
    this.ratingUser.chapter = this.chapter.$key;
    this.ratingUser.consistency = 0;
    this.ratingUser.grammar = 0;
    this.ratingUser.inspiration = 0;
    this.ratingUser.lexicon = 0;
    this.ratingUser.total = 0;
    this.isLoading = false;
    this.isDataExisting = true;
  }
}
