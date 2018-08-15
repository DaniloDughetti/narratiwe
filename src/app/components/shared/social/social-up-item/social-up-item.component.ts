import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../../../../models/story';
import { User } from '../../../../models/user';
import { Up } from '../../../../models/up';
import { StoryComment } from '../../../../models/storyComment';
import { UpService } from '../../../../services/up.service';
import { DataService } from '../../../../services/data.service';
import { StoryService } from '../../../../services/story.service';

@Component({
  selector: 'social-up-item',
  templateUrl: './social-up-item.component.html',
  styleUrls: ['./social-up-item.component.css']
})
export class SocialUpItemComponent implements OnInit {


  @Input("story")
  private story: Story;
  @Input("ups")
  private ups: Up[];
  private up: Up;
  private isUpped: boolean = false;
  private upsNumber: number = 0;

  private upDisabled: boolean = false;

  constructor(private dataService: DataService,
    private upService: UpService,
    private storyService: StoryService) { }

  ngOnInit() {
    this.setUpItem();
  }

  private setUpItem(): any {
    try {
      if (this.ups != null) {
        this.upsNumber = this.ups.length;
        this.setUp();
      }
    } catch (e) {
      this.dataService.manageError(e.message, "social-up-item.component");
    }
  }

  private setUp(){
    for (let i = 0; i < this.ups.length; i++) {
      if (this.ups[i].user == this.dataService.getAuthService.currentUserId) {
        this.up = this.ups[i];
        this.isUpped = true;
        break;
      }
    }
  }

  upClicked() {
    try {
      this.upDisabled = true;
      if (this.isUpped)
        this.uploadUp();
      else
        this.uploadUpDown();
      
    } catch (e) {
      this.dataService.manageError(e.message, "social-up-item.component");
    }
  }

  private uploadUpDown() {
    this.up = new Up();
    this.up.story = this.story.$key;
    this.up.user = this.dataService.getAuthService.currentUserId;
    this.createUp();
  }

  private createUp() {
    this.upService.createUp(this.up).then(() => {
      this.story = this.storyService.incrementUpNumber(this.story);
      this.storyService.updateStory(this.story.$key, this.story)
        .then(() => {
          this.isUpped = !this.isUpped;
          this.upsNumber++;
          this.upDisabled = false;
        })
        .catch((error) => {
          this.upDisabled = false;
        });
    })
      .catch((error) => {
        this.upDisabled = false;
      });
  }

  private uploadUp() {
    this.upService.deleteUp(this.up.$key).then(() => {
      this.story = this.storyService.decrementUpNumber(this.story);
      this.storyService.updateStory(this.story.$key, this.story)
        .then(() => {
          this.isUpped = !this.isUpped;
          this.upsNumber--;
          this.upDisabled = false;
        })
        .catch((error) => {
          this.upDisabled = false;
        });
    })
      .catch((error) => {
        this.upDisabled = false;
      });
  }
}
