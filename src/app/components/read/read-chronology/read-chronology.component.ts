import { Component, OnInit, Input } from '@angular/core';
import { StoryService } from "../../../services/story.service";
import { ChapterService } from "../../../services/chapter.service";
import { DataService } from "../../../services/data.service";
import { Story } from "../../../models/story";
import { User } from "../../../models/user";
import { ReadChronology } from "../../../models/readChronology";
import { StoryDateeditingPipe } from '../../../pipes/story-dateediting.pipe';

@Component({
  selector: 'read-chronology',
  templateUrl: './read-chronology.component.html',
  styleUrls: ['./read-chronology.component.css']
})
export class ReadChronologyComponent implements OnInit {

  private stories: Story[];
  private user: User;
  private showedMore: boolean = false;
  private isListLoading: boolean = true;
  private isDataExisting: boolean = false;

  @Input('componentTitle')
  public componentTitle: string;

  constructor(private dataService: DataService,
    private storyService: StoryService,
    private chapterService: ChapterService) { }

  ngOnInit() {
    this.initReadChronology();
  }

  private initReadChronology() {
    try {
      this.stories = [];
      this.user = this.dataService.user;
      if (this.isChronologyNotEmpty()) {
        this.setChronology();
      }
      else {
        this.isListLoading = false;
        this.isDataExisting = false;
      }
    }
    catch (e) {
      this.dataService.manageError(e.message, "read-chronology.component");
    }
  }

  private setChronology() {
    let readChronologyTemp = this.orderReadChronology(this.user.readChronology);
    for (let i = 0; i < readChronologyTemp.length; i++) {
      this.getStory(readChronologyTemp, i);
    }
    this.isListLoading = false;
    this.isDataExisting = true;
  }

  private getStory(readChronologyTemp: ReadChronology[], i: number) {
    this.storyService.getStory(readChronologyTemp[i].story)
      .subscribe((story) => {
        this.stories.push(story);
      });
  }

  private isChronologyNotEmpty() {
    return this.user != null
      && this.user.readChronology != null
      && this.user.readChronology.length > 0;
  }

  private readStory(story: Story): void {
    this.getChapterList(story);
  }

  private getChapterList(story: Story) {
    this.chapterService.getChaptersList({
      orderByChild: 'story',
      equalTo: story.$key
    }).subscribe((chapters) => {
      this.setNavigationParams(chapters, story);
    });
  }

  private setNavigationParams(chapters: any, story: Story) {
    this.dataService.setPwChapters(chapters);
    this.isListLoading = false;
    this.dataService.setPwStory(story);
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