import { Component, OnInit, Input } from '@angular/core';

import { UserService } from "../../../services/user.service";
import { ChapterService } from "../../../services/chapter.service";
import { UploadService } from '../../../uploads/shared/upload.service';

import { User } from "../../../models/user";
import { Chapter } from "../../../models/chapter";

@Component({
  selector: 'story-read-item',
  templateUrl: './story-read-item.component.html',
  styleUrls: ['./story-read-item.component.css']
})
export class StoryReadItemComponent implements OnInit {

  @Input('chapter')
  private chapter: Chapter;
  private user: User;
  private userImage: string;
  private isLoading: boolean = true;

  constructor(private userService: UserService,
    private uploadService: UploadService,
    private chapterService: ChapterService) { }

  ngOnInit() { 
    this.getUser();
  }

  private getUser() {
    this.userService.getUser(this.chapter.user).subscribe((user) => {
      this.user = user;
      if (this.user != null) {
        this.getUserImage();
      }
      else {
        this.isLoading = false;
      }
    });
  }

  private getUserImage() {
    this.uploadService.getUserProfileImageUrl(this.user.$key).getDownloadURL()
      .then(url => {
        this.userImage = url;
        this.isLoading = false;
      }).catch(() => {
        this.userImage = null;
        this.isLoading = false;
      });
  }
}
