import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';
import { UploadService } from '../uploads/shared/upload.service';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  private isDataLoaded: boolean = false;
  private isLoading = true;

    constructor(
      private dataService: DataService,
      private userService: UserService,
      private uploadService: UploadService) { }
   
    ngOnInit() {
      this.isDataLoaded = false;
      this.getUser();
    }
  
  private getUser() {
    this.userService.getUser(this.dataService.getAuthService.currentUserId)
      .subscribe((user) => {
        this.dataService.user = user;
        this.getUserImage(user);
      }, err => {
        this.isDataLoaded = true;
        this.isLoading = false;
      });
  }

  private getUserImage(user: any) {
    this.uploadService.getUserProfileImageUrl(user.$key).getDownloadURL()
      .then(url => {
        this.dataService.setPwUserImage(url);
        this.setEnvironmentFlags();
      }).catch((error) => {
        this.dataService.setPwUserImage(null);
        this.setEnvironmentFlags();
      });
  }

  private setEnvironmentFlags() {
    this.isDataLoaded = true;
    this.isLoading = false;
  }

  public goToApp(): void{
    this.dataService.navigate("/home/market");
  }

}
