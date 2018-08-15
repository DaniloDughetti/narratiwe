import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { DataService } from '../../../services/data.service';
import { StoryService } from "../../../services/story.service";
import { UserService } from "../../../services/user.service";
import { ChapterService } from "../../../services/chapter.service";
import { UploadService } from '../../../uploads/shared/upload.service';
import { Story } from "../../../models/story";
import { User } from "../../../models/user";
import { Chapter } from "../../../models/chapter";

@Component({
  selector: 'story-read',
  templateUrl: './story-read.component.html',
  styleUrls: ['./story-read.component.css']
})
export class StoryReadComponent implements OnInit {

  private sub: any;
  private storyId: string;
  private story: Story;
  private user: User;
  private chapters: Chapter[];
  private isListLoading: boolean = true;
  private isChapterListEmpty: boolean = true;

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private storyService: StoryService,
    private userService: UserService,
    private uploadService: UploadService,
    private chapterService: ChapterService) { }

  ngOnInit() {
    try {
      this.sub = this.route.params.subscribe(params => {
        this.storyId = params['id'];
        this.initStory();
      });
    } catch (e) {
      this.dataService.manageError(e.message, "story-read.component");
    }
  }

  private initStory() {
    if (this.storyId != null) {
      this.getStory();
    }
  }

  private getStory() {
    this.storyService.getStory(this.storyId).subscribe((story) => {
      if (story != null) {
        this.story = story;
        this.getUser();
      }
      else {
        this.location.back();
      }
    });
  }

  private getUser() {
    this.userService.getUser(this.story.user).subscribe((user) => {
      this.user = user;
      this.setNicknameVisibility(user);
      this.dataService.setPwUser(this.user);
      this.getChapterList();
    });
  }

  private getChapterList() {
    this.chapterService.getChaptersList({
      orderByChild: 'story',
      equalTo: this.story.$key
    }).subscribe((chapters) => {
      this.setChapters(chapters);
    });
  }

  private setChapters(chapters: Chapter[]) {
    this.chapters = chapters;
    this.isChapterListEmpty = this.isChapterNull();
    this.isListLoading = false;
  }

  private isChapterNull(): boolean{
    return this.chapters == null || this.chapters.length == 0
  }

  private setNicknameVisibility(user: User) {
    if (user.showNickname == null)
      this.user.showNickname = false;
  } 

  newChapter() {
   this.dataService.setPwChapter(null);
    this.dataService.setPwChapterLastIndex(this.chapters.length);
    this.dataService.setPwStory(this.story);
    this.dataService.navigate("/home/chapter-edit");
  }

  backClicked() {
    this.location.back();
  }
}
