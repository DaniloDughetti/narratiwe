import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { ChapterService } from '../../../services/chapter.service';
import { UserService } from '../../../services/user.service';
import { User } from "../../../models/user";
import { Story } from "../../../models/story";
import { Chapter } from "../../../models/chapter";
import { Location } from '@angular/common';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';


@Component({
  selector: 'chapter-read',
  templateUrl: './chapter-read.component.html',
  styleUrls: ['./chapter-read.component.css']
})
export class ChapterReadComponent implements OnInit {

  private user: User;
  private chapterUser: User;
  private chapter: Chapter;
  private story: Story;
  private chapters: Chapter[];
  private chapterIndex: number;
  private isLoading: boolean = true;
  private canGoBack: boolean = false;
  private canGoNext: boolean = false;

  constructor(private dataService: DataService,
    private chapterService: ChapterService,
    private location: Location,
    private userService: UserService) { }

  ngOnInit() {
    this.initChapterToRead();
  }

  private initChapterToRead() {
    try {
      this.initNavigationParams();
      if (this.isNavigationParamsCorrect()) 
        this.setChapterToRead();
    }
    catch (e) {
      this.dataService.manageError(e.message, "chapter-read.component");
    }
  }

  private setChapterToRead() {
    if (this.chapter == null) {
      this.chapterIndex = this.chapterService.getChapterIndex(this.chapters, this.userService.getLastChapterRead(this.user, this.story.$key));
      this.chapter = this.chapters[this.chapterIndex];
    }
    else {
      this.chapterIndex = this.chapter.index;
    }
    this.setCurrentReadPosition();
    this.setNavigationButtons();
    this.userService.getUser(this.chapter.user)
      .subscribe((user) => {
        this.chapterUser = user;
        this.isLoading = false;
      });
  }

  private initNavigationParams() {
    this.user = this.dataService.user;
    this.chapters = this.dataService.getPwChapters();
    this.chapter = this.dataService.getPwChapter();
    this.story = this.dataService.getPwStory();
  }

  private goToStoryPreviewClicked() {
    this.dataService.setPwStory(this.story);
    this.dataService.navigateWithParameter('/home/story-preview', this.story.$key);
  }

  private isNavigationParamsCorrect(): boolean {
    if (this.user == null) {
      this.location.back();
      return false;
    }
    if (this.story == null) {
      this.location.back();
      return false;
    }
    if (this.chapters == null) {
      this.location.back();
      return false;
    }
    return true;
  }

  private goToChapterPreviewClicked() {
    this.dataService.navigateWithParameter("/home/chapter-preview", this.chapter.$key);
  }

  private goToPreviousChapter() {
    try {
      if (this.canGoBack) {
        this.chapterIndex = this.chapterIndex - 1;
        this.setNavigationButtons();
        if (this.chapters[this.chapterIndex] != null) {
          this.isLoading = true;
          this.dataService.setPwChapter(this.chapters[this.chapterIndex]);
          this.chapter = this.chapters[this.chapterIndex];
          this.setCurrentReadPosition();
        }
      }
    } catch (e) {
      this.dataService.manageError(e.message, "chapter-read.component");
    }
  }

  private goToNextChapter() {
    try {
      if (this.canGoNext) {
        this.chapterIndex = this.chapterIndex + 1;
        this.setNavigationButtons();
        if (this.chapters[this.chapterIndex] != null) {
          this.isLoading = true;
          this.dataService.setPwChapter(this.chapters[this.chapterIndex]);
          this.chapter = this.chapters[this.chapterIndex];
          this.setCurrentReadPosition();
        }
      }
    } catch (e) {
      this.dataService.manageError(e.message, "chapter-read.component");
    }
  }

  private setNavigationButtons(): void {
    this.canGoBack = (this.chapterIndex > 0);
    this.canGoNext = (this.chapterIndex + 1 < this.chapters.length);
  }

  private setCurrentReadPosition(): void {
    try {
      this.user = this.userService.setLastChapterRead(this.user, this.story.$key, this.chapter.$key);
      this.updateUser();
      this.isLoading = false;
    } catch (e) {
      this.dataService.manageError(e.message, "chapter-read.component");
    }
  }

  private updateUser() {
    this.userService.updateUser(this.user.$key, this.user).catch(() => {
      this.isLoading = false;
    }).catch((error) => {
      this.isLoading = false;
    });
  }
}
