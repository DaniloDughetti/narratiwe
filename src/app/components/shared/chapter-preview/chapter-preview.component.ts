import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { ChapterService } from '../../../services/chapter.service';
import { StoryService } from '../../../services/story.service';
import { UserService } from '../../../services/user.service';
import { SocialService } from '../../../services/social.service';
import { User } from "../../../models/user";
import { Story } from "../../../models/story";
import { Chapter } from "../../../models/chapter";
import { Location } from '@angular/common';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'chapter-preview',
  templateUrl: './chapter-preview.component.html',
  styleUrls: ['./chapter-preview.component.css']
})
export class ChapterPreviewComponent implements OnInit {
  private sub: any;
  private chapterId: string;
  private user: User;
  private chapter: Chapter;
  private story: Story;
  private isLoading: boolean = true;
  private isEditPossible: boolean = false;

  constructor(private dataService: DataService,
    private location: Location,
    private chapterService: ChapterService,
    private storyService: StoryService,
    private socialService: SocialService,
    private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() { 
    this.initChapterPreview();
  }

  private initChapterPreview() {
    try {
      this.sub = this.route.params.subscribe(params => {
        this.chapterId = params['id'];
        this.setChapterPreview();
      });
    }
    catch (e) {
      this.dataService.manageError(e.message, "chapter-preview.component");
    }
  }

  private setChapterPreview() {
    if (this.chapterId != null) {
      this.setChapter();
    }
  }

  private setChapter() {
    this.chapterService.getChapter(this.chapterId).subscribe((chapter) => {
      if (chapter != null) {
        this.chapter = chapter;
        this.getUser();
      }
      else {
        this.location.back();
      }
    });
  }

  private getUser() {
    this.userService.getUser(this.chapter.user).subscribe((user) => {
      if (user != null) {
        this.user = user;
        this.getStory();
      }
      else {
        this.location.back();
      }
    });
  }

  private getStory() {
    this.storyService.getStory(this.chapter.story).subscribe((story) => {
      if (story != null) {
        this.story = story;
        this.isLoading = false;
        this.isEditPossible = this.isChapterEditable();
      }
      else {
        this.location.back();
      }
    });
  }

  private backClicked() {
    this.dataService.resetPwVariables();
    this.dataService.navigateWithParameter('/home/story-preview', this.story.$key);
  }

  private isChapterEditable(): boolean {
    return (this.story.type == 'private' && this.story.user == this.dataService.getAuthService.currentUserId);
  }

  private isReportable(): boolean {
    return !(this.story.type == 'private' && this.story.user == this.dataService.getAuthService.currentUserId);
  }

  private editChapter() {
    this.dataService.setPwChapter(this.chapter);
    this.dataService.setPwStory(this.story);
    this.dataService.setPwUser(this.user);
    this.dataService.navigate("/home/chapter-edit");
  }

  private readChapter() {
    this.dataService.setPwChapter(this.chapter);
    this.dataService.setPwStory(this.story);
    this.dataService.setPwUser(this.user);
    this.dataService.navigate("/home/chapter-read");
  }

  private reportAbuse(){
    this.dataService.manageAbuse(this.chapter.$key, this.chapter.user, this.story.$key);
  }

  private viewUser() {
    this.dataService.navigateWithParameter('/home/profile/view-general', this.user.$key);
  }

  private shareOnFacebook() {
    this.socialService.shareChapter(this.chapter.$key)
      .then((res) => {
        this.dataService.openCustomSnackBar('Chapter shared', 'info');
      })
      .catch(error => {
        this.dataService.openCustomSnackBar('Chapter not shared!', 'info');
      })
  }

}
