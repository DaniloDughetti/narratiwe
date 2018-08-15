import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../../../services/data.service';
import { StoryService } from "../../../services/story.service";
import { UserService } from "../../../services/user.service";
import { SocialService } from "../../../services/social.service";
import { Story } from "../../../models/story";
import { User } from "../../../models/user";
import { UploadService } from '../../../uploads/shared/upload.service';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PublishDialogComponent } from '../../dialogs/publish-dialog/publish-dialog.component'; 
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';

@Component({
  selector: 'story-preview',
  templateUrl: './story-preview.component.html',
  styleUrls: ['./story-preview.component.css']
})
export class StoryPreviewComponent implements OnInit {

  private sub: any;
  private storyId: string;
  private story: Story;
  private user: User;
  private storyImage: string;
  private kind: string;
  private storyType: boolean = false;
  private storyVisibility: boolean = true;
  private isLoading: boolean = true;

  private isEditPossible: boolean = false;
  private isFavorite: boolean = false;
  private isReadPossible: boolean = false;
  private isPublishPossible: boolean = false;

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private storyService: StoryService,
    private userService: UserService,
    private uploadService: UploadService,
    public dialog: MatDialog,
    private socialService: SocialService) { }

  ngOnInit() {
    try {
      this.sub = this.route.params.subscribe(params => {
        this.storyId = params['id'];
        this.initStory();
      });
    } catch (e) {
      this.dataService.manageError(e.message, "story-preview.component");
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
        this.setStoryParams();
        this.getUser();
        this.setStoryKind();
      }
      else {
        this.location.back();
      }
    });
  }

  private setStoryKind() {
    this.kind = this.storyService.getKindValue(this.story.kind, this.dataService.user.systemLanguage);
  }

  private setStoryParams() {
    this.storyType = (this.story.type == 'private');
    this.storyVisibility = (this.story.visibility == 'visible');
    this.isPublishPossible = (this.story.type == 'private');
  }

  private getUser() {
    this.userService.getUser(this.story.user).subscribe((user) => {
      this.user = user;
      this.setUserParams(user);
    });
  }

  private setUserParams(user: User) {
    this.setUserNicknameVisibility(user);
    this.dataService.setPwUser(this.user);
    this.setUserFavorites();
    this.isEditPossible = this.isStoryEditable();
    this.isPublishPossible = this.isStoryPublishable();
    this.setUserImage();
  }

  private setUserImage() {
    this.uploadService.getUserCustomImageUrl(this.story.user, this.story.image).getDownloadURL()
      .then(url => {
        this.storyImage = url;
        this.isLoading = false;
      }).catch(() => {
        this.storyImage = null;
        this.isLoading = false;
      });
  }

  private setUserFavorites() {
    if (this.dataService.user.favoriteStories != null)
      this.isFavorite = this.userService.isInFavorites(this.dataService.user, this.story.$key);
  }

  private setUserNicknameVisibility(user: User) {
    if (user.showNickname == null)
      this.user.showNickname = false;
  }

  backClicked() {
    this.dataService.resetPwVariables();
    this.location.back();
  }

  editClicked() {
    this.dataService.setPwUser(this.user);
    this.dataService.setPwStory(this.story);
    this.dataService.navigate("/home/story-edit-preview");
  }

  isStoryEditable(): boolean {
    return this.story.user == this.dataService.getAuthService.currentUserId;
  }

  isStoryPublishable(): boolean {
    return this.story.user == this.dataService.getAuthService.currentUserId
      && this.story.type == 'private';
  }

  addToFavorites() {
    try {
      let tempUser: User = this.dataService.user;
      tempUser = this.userService.addFavorites(tempUser, this.story.$key);
      this.userService.updateUser(tempUser.$key, tempUser).then(() => {
        this.isFavorite = true;
      }).catch((error) => {
        //console.log(error);
      });
    } catch (e) {
      this.dataService.manageError(e.message, "story-preview.component");
    }
  }

  removeFromFavorites() {
    try {
      let tempUser: User = this.dataService.user;
      tempUser = this.userService.removeFavorites(tempUser, this.story.$key);
      this.userService.updateUser(tempUser.$key, tempUser).then(() => {
        this.isFavorite = false;
      }).catch((error) => {
        //console.log(error);
      });
    } catch (e) {
      this.dataService.manageError(e.message, "story-previev.component");
    }
  }

  readClicked() {
    this.dataService.setPwStory(this.story);
    this.dataService.setPwUser(this.user);
    this.dataService.navigate("/home/chapter-read");
  }

  setStoryReadable(ev) {
    this.isReadPossible = (ev > 0);
  }

  openPublishDialog() {
    let dialogRef = this.dialog.open(PublishDialogComponent, {
      width: '40%',
      data: { title: this.story.title, isPublished: this.storyVisibility }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.story.visibility == 'hidden') {
          this.story.visibility = 'visible';
          this.story.datePublished = new Date().getTime();
          this.storyService.updateStory(this.story.$key, this.story)
            .then(() => {
              if (this.dataService.user.systemLanguage != null && this.dataService.user.systemLanguage == "Italian")
                this.dataService.openCustomSnackBar('Storia pubblicata!', 'info');
              else
                this.dataService.openCustomSnackBar('Story published!', 'info');
              this.storyVisibility = (this.story.visibility == 'visible');
            })
            .catch((error) => {
              //console.log(error);
              this.storyVisibility = (this.story.visibility == 'visible');
              if (this.dataService.user.systemLanguage != null && this.dataService.user.systemLanguage == "Italian")
                this.dataService.openCustomSnackBar('Storia non pubblicata!', 'info');
              else
                this.dataService.openCustomSnackBar('Story not published!', 'info');

            });
        } else {
          this.story.visibility = 'hidden';
          this.story.datePublished = new Date().getTime();
          this.storyService.updateStory(this.story.$key, this.story)
            .then(() => {
              this.storyVisibility = (this.story.visibility == 'visible');
              if (this.dataService.user.systemLanguage != null && this.dataService.user.systemLanguage == "Italian")
                this.dataService.openCustomSnackBar('Storia rimossa dal market!', 'info');
              else
                this.dataService.openCustomSnackBar('Story removed from market!', 'info');
            })
            .catch((error) => {
              //console.log(error);
              this.storyVisibility = (this.story.visibility == 'visible');
              if (this.dataService.user.systemLanguage != null && this.dataService.user.systemLanguage == "Italian")
                this.dataService.openCustomSnackBar('Storia non rimossa!', 'info');
              else
                this.dataService.openCustomSnackBar('Story not removed!', 'info');
            });
        }

      }
    });
  }

  viewUser() {
    this.dataService.navigateWithParameter('/home/profile/view-general', this.user.$key);
  }

  shareOnFacebook() {
    this.socialService.shareStory(this.story.$key)
      .then((res) => {
        this.dataService.openCustomSnackBar('Story shared', 'info');
      })
      .catch(error => {
        this.dataService.openCustomSnackBar('Story not shared', 'info');
      })
  }

}
