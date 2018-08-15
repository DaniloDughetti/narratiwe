import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../../services/data.service";
import { UploadService } from "../../../uploads/shared/upload.service";
import { User } from "../../../models/user";
import { FirebaseObjectObservable } from 'angularfire2/database';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewProfileComponent implements OnInit {

  @Input('user')
  private user: User;
  @Input('isEditPossible')
  private isEditPossible: boolean;
  private birthday: string;
  private profileImage: string;
  private isImageLoading: boolean = true;

  constructor(private dataService: DataService,
    private uploadService: UploadService) { }


  ngOnInit() {
    this.initViewProfile();
  }

  private initViewProfile() {
    try {
      this.birthday = new Date(this.user.birthday).toLocaleString();
      if (this.isUserProfileOwned()) {
        this.getUserImage();
      }
      else {
        this.profileImage = this.dataService.getPwUserImage();
      }
      this.isImageLoading = false;
    }
    catch (e) {
      this.dataService.manageError(e.message, "viewprofile.component");
    }
  }

  private isUserProfileOwned() {
    return this.user.$key != this.dataService.getAuthService.currentUserId;
  }

  private getUserImage() {
    this.uploadService.getUserProfileImageUrl(this.user.$key).getDownloadURL()
      .then(url => {
        this.profileImage = url;
      }).catch((error) => {
        this.profileImage = this.dataService.getDefaultUserImage();
      });
  }

  private goToUpdateUser() {
    this.dataService.navigate("/home/profile/edit");
  }
}
