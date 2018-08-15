import { Component, OnInit, Input } from '@angular/core';
import { Story } from "../../../models/story";
import { User } from "../../../models/user";
import { DataService } from "../../../services/data.service";
import { UploadService } from '../../../uploads/shared/upload.service';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';

@Component({
  selector: 'story-item',
  templateUrl: './story-item.component.html',
  styleUrls: ['./story-item.component.css']
})
export class StoryItemComponent implements OnInit {

  @Input('story')
  private story: Story;
  @Input('vote')
  private vote: number;
  @Input('showVote')
  private showVote: boolean;

  private user: User;
  private storyImage: string;
  private isStoryPrivate: boolean = false;
  private isLoading: boolean = true;

  constructor(private dataService: DataService,
    private uploadService: UploadService) { }

  ngOnInit() {
    this.initItem();
  }

  private initItem() {
    try {
      this.setStoryType();
      this.getUser();
    }
    catch (e) {
      this.dataService.manageError(e.message, "story-item.component");
    }
  }

  private getUser() {
    this.dataService.getUserService.getUser(this.story.user).subscribe((user) => {
      this.user = user;
      this.getUserImage();
    });
  }

  private getUserImage() {
    this.uploadService.getUserCustomImageUrl(this.story.user, this.story.image).getDownloadURL()
      .then(url => {
        this.storyImage = url;
        this.isLoading = false;
      }).catch(() => {
        this.storyImage = null;
        this.isLoading = false;
      });
  }

  private setStoryType() {
    this.isStoryPrivate = (this.story.type == 'private');
  }
}
