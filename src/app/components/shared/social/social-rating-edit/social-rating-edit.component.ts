import { Component, OnInit, Input } from '@angular/core';
import { Rating } from "../../../../models/rating";
import { Chapter } from "../../../../models/chapter";
import { Story } from "../../../../models/story";
import { User } from "../../../../models/user";
import { RatingService } from "../../../../services/rating.service";
import { ChapterService } from "../../../../services/chapter.service";
import { StoryService } from "../../../../services/story.service";
import { UserService } from "../../../../services/user.service";
import { DataService } from "../../../../services/data.service";


@Component({
  selector: 'social-rating-edit',
  templateUrl: './social-rating-edit.component.html',
  styleUrls: ['./social-rating-edit.component.css']
})
export class SocialRatingEditComponent implements OnInit {

  @Input("chapter")
  private chapter: Chapter;
  @Input("story")
  private story: Story;
  @Input("rating")
  private rating: Rating;
  @Input("isAlreadyRated")
  private isAlreadyRated: boolean;
  private user: User;
  private isDataExisting: boolean = false;
  private isLoading: boolean = true;
  private voteDisabled: boolean = false;

  constructor(private dataService: DataService,
    private ratingService: RatingService,
    private chapterService: ChapterService,
    private storyService: StoryService,
    private userService: UserService) { }

  ngOnInit() {
    this.initParams();
    this.getUser();
  }

  private getUser() {
    this.userService.getUser(this.chapter.user)
      .subscribe((user) => {
        this.user = user;
        this.isLoading = false;
      });
  }

  private initParams() {
    if (this.rating == null || this.story == null || this.chapter == null) {
      this.isDataExisting = false;
    }
    else {
      this.isDataExisting = true;
    }
  }

  private starGrammarEmitter(event) {
    this.rating.grammar = event;
  }

  private starConsistencyEmitter(event) {
    this.rating.consistency = event;
  }

  private starInspirationEmitter(event) {
    this.rating.inspiration = event;
  }

  private starLexiconEmitter(event) {
    this.rating.lexicon = event;
  }

  public voteClicked() {
    try {
      this.initRating();
      this.createRating();
    } catch (e) {
      this.voteDisabled = false;
      this.dataService.manageError(e.message, "social-rating-edit.component");
    }
  }

  private createRating() {
    this.ratingService.createRating(this.rating)
      .then(() => {
        if (this.isRatingSummaryNull) {
          this.chapter.ratingSummary = new Rating();
          this.chapter.ratingSummary.user = this.dataService.getAuthService.currentUserId;
          this.chapter.ratingSummary.chapter = this.chapter.$key;
          this.chapter.ratingSummary.dateEditing = new Date().getTime();
          this.chapter.ratingNumber = 0;
        }
        this.chapter.ratingNumber = this.chapter.ratingNumber + 1;
        this.chapter.ratingSummary = this.ratingService.addAverageRating(this.chapter.ratingSummary, this.rating, this.chapter.ratingNumber);
        this.updateChapter();
      })
      .catch((error) => {
        this.voteDisabled = false;
        this.dataService.openCustomSnackBar("Something gone wrong saving the rate", "error");
      });
  }

  private updateChapter() {
    this.chapterService.updateChapter(this.chapter.$key, this.chapter)
      .then(() => {
        if (this.isRatingSummaryNull()) {
          this.setRatingSummary();
        }
        this.story.ratingNumber = this.story.ratingNumber + 1;
        this.story.ratingSummary = this.ratingService.addAverageRating(this.story.ratingSummary, this.rating, this.story.ratingNumber);
        this.updateStory();
      })
      .catch((error) => {
        this.voteDisabled = false;
        this.dataService.openCustomSnackBar("Something gone wrong saving the rate", "error");
      });
  }

  private setRatingSummary() {
    this.story.ratingSummary = new Rating();
    this.story.ratingSummary.user = this.dataService.getAuthService.currentUserId;
    this.story.ratingSummary.chapter = this.chapter.$key;
    this.story.ratingSummary.dateEditing = new Date().getTime();
    this.story.ratingNumber = 0;
  }

  private updateStory() {
    this.storyService.updateStory(this.story.$key, this.story)
      .then(() => {
        if (this.isStoryCurrentUserOwned()) {
          this.initRatingSummary();
          this.user.ratingNumber = this.user.ratingNumber + 1;
          this.user.ratingSummary = this.ratingService.addAverageRating(this.user.ratingSummary, this.rating, this.user.ratingNumber);
          this.updateUser();
        }
        else {
          this.handleUserNull();
        }
      })
      .catch((error) => {
        this.voteDisabled = false;
        this.dataService.openCustomSnackBar("Something gone wrong saving the rate", "error");
      });
  }

  private isRatingSummaryNull() {
    return this.story.ratingSummary == null;
  }

  private isStoryCurrentUserOwned() {
    return this.chapter.user != this.dataService.getAuthService.currentUserId
      && this.user != null;
  }

  private handleUserNull() {
    this.isAlreadyRated = true;
    this.voteDisabled = false;
    this.dataService.openCustomSnackBar("Rated", "info");
  }

  private initRatingSummary() {
    if (this.user.ratingSummary == null) {
      this.user.ratingSummary = new Rating();
      this.user.ratingSummary.user = this.user.$key;
      this.user.ratingSummary.chapter = this.chapter.$key;
      this.user.ratingSummary.dateEditing = new Date().getTime();
      this.user.ratingNumber = 0;
    }
  }

  private updateUser() {
    this.userService.updateUser(this.user.$key, this.user)
      .then(() => {
        this.voteDisabled = false;
        this.isAlreadyRated = true;
        this.dataService.openCustomSnackBar("Rated", "info");
      })
      .catch((error) => {
        this.voteDisabled = false;
        this.dataService.openCustomSnackBar("Something gone wrong saving the rate", "error");
      });
  }

  private initRating() {
    this.voteDisabled = true;
    this.rating.dateEditing = new Date().getTime();
    this.rating.total = (this.rating.consistency + this.rating.grammar + this.rating.inspiration + this.rating.lexicon) / 4;
  }
}
