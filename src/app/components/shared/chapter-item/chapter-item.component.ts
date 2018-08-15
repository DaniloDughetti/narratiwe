import { Component, OnInit, Input } from '@angular/core';
import { Chapter } from "../../../models/chapter";
import { Story } from "../../../models/story";
import { User } from "../../../models/user";
import { DataService } from "../../../services/data.service";
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';

@Component({
  selector: 'chapter-item',
  templateUrl: './chapter-item.component.html',
  styleUrls: ['./chapter-item.component.css']
})
export class ChapterItemComponent implements OnInit {

  @Input('chapter')
  private chapter: Chapter;
  @Input('story')
  private story: Story;
  private user: User;
  private isStoryPrivate: boolean = false;
  private isLoading: boolean = true;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.initChapterItem();
  }

  private initChapterItem() {
    try {
      this.isStoryPrivate = (this.isStoryTypePrivate());
      this.getUser();
    }
    catch (e) {
      this.dataService.manageError(e.message, "chapter-edit.component");
    }
  }

  private getUser() {
    this.dataService.getUserService.getUser(this.chapter.user).subscribe((user) => {
      this.user = user;
      this.isLoading = false;
    });
  }

  private isStoryTypePrivate(): boolean {
    return this.story.type == 'private';
  }

  private showChapterPreview() {
    this.dataService.navigateWithParameter('/home/chapter-preview', this.chapter.$key);
  } 

}
