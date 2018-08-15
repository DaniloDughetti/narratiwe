import { Component, OnInit, Input } from '@angular/core';
import { StoryService } from "../../../services/story.service";
import { ChapterService } from "../../../services/chapter.service";
import { DataService } from "../../../services/data.service";
import { Story } from "../../../models/story";
import { User } from "../../../models/user";
import { ReadChronology } from "../../../models/readChronology";
import { StoryDateeditingPipe } from '../../../pipes/story-dateediting.pipe';

@Component({
  selector: 'continue-read',
  templateUrl: './continue-read.component.html',
  styleUrls: ['./continue-read.component.css']
})
export class ContinueReadComponent implements OnInit {

  private story: Story;
  private user: User;
  private showedMore: boolean = false;
  private isListLoading: boolean = true;
  private isDataExisting: boolean = false;
  @Input('componentTitle')
  private componentTitle: string;

  constructor(private dataService: DataService,
    private storyService: StoryService,
    private chapterService: ChapterService) { }

  ngOnInit() {
    this.initContinueRead();
  }

  private initContinueRead() {
    try {
      this.user = this.dataService.user;
      if (this.isChronologyNotEmpty()) {
        this.getStory();
      }
      else {
        this.isListLoading = false;
        this.isDataExisting = false;
      }
    }
    catch (e) {
      this.dataService.manageError(e.message, "continue-read.component");
    }
  }

  private getStory() {
    let readChronologyTemp = this.orderReadChronology(this.user.readChronology);
    this.storyService.getStory(readChronologyTemp[0].story).subscribe((story) => {
      this.story = story;
      this.isListLoading = false;
      if (this.story != null)
        this.isDataExisting = true;
      this.getChapterList();
    });
  }

  private getChapterList() {
    this.chapterService.getChaptersList({
      orderByChild: 'story',
      equalTo: this.story.$key
    }).subscribe((chapters) => {
      this.dataService.setPwChapters(chapters);
      this.isListLoading = false;
    });
  }

  private isChronologyNotEmpty() {
    return this.user != null
      && this.user.readChronology != null
      && this.user.readChronology.length > 0;
  }

  private readStory(): void {
    this.dataService.setPwStory(this.story);
    this.dataService.setPwUser(this.user);
    this.dataService.navigate("/home/chapter-read");
  }

  private orderReadChronology(array: ReadChronology[]): ReadChronology[] {
    array.sort((a: ReadChronology, b: ReadChronology) => {
      if (a.dateEditing > b.dateEditing) {
        return -1;
      } else if (a.dateEditing < b.dateEditing) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

}
