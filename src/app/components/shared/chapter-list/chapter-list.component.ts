import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from "../../../models/user";
import { Story } from "../../../models/story";
import { Chapter } from "../../../models/chapter";
import { DataService } from "../../../services/data.service";
import { ChapterService } from "../../../services/chapter.service";
import { ChapterIndexPipe } from '../../../pipes/chapter-index.pipe';

//import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
//import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.css']
})
export class ChapterListComponent implements OnInit {

  @Input('story')
  private story: Story;
  @Output()
  private chaptersLength = new EventEmitter();
  private chapters: Chapter[];
  private isListLoading: boolean = true;
  private isChapterListEmpty: boolean = true;
  private isEditPossible: boolean = false;

  constructor(private dataService: DataService,
    private chapterService: ChapterService) { }

  ngOnInit() {
    this.initChapterList();
  }

  private initChapterList() {
    try {
      this.chapterService.getChaptersList({
        orderByChild: 'story',
        equalTo: this.story.$key
      }).subscribe((chapters) => {
        this.setChapterList(chapters);
      });
      this.isEditPossible = this.isStoryEditable();
    }
    catch (e) {
      this.dataService.manageError(e.message, "chapter-list.component");
    }
  }

  private setChapterList(chapters: any) {
    this.chapters = chapters;
    this.isListLoading = false;
    if (this.chapters == null || this.chapters.length == 0) {
      this.isChapterListEmpty = false;
      this.chaptersLength.emit(0);
    }
    else {
      this.dataService.setPwChapters(this.chapters);
      this.chaptersLength.emit(this.chapters.length);
    }
  }

  private newChapter() {
    this.dataService.setPwChapter(null);
    this.dataService.setPwChapterLastIndex(this.chapters.length);
    this.dataService.setPwStory(this.story);
    this.dataService.navigate("/home/chapter-edit");
  }

  private isStoryEditable(): boolean {
    if (this.isStoryShared()) {
      return true;
    }
    if (this.isStoryCurrentUserOwned()) {
      return true;
    }
    return false;
  }


  private isStoryCurrentUserOwned() {
    return this.story.user == this.dataService.getAuthService.currentUserId;
  }

  private isStoryShared() {
    return this.story.type != 'private';
  }
}
