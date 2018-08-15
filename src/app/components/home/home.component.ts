import { Component, OnInit } from '@angular/core';
import { DataService } from "../../services/data.service";
import { UserService } from "../../services/user.service";
import { UploadService } from "../../uploads/shared/upload.service";
import { AuthService } from "../../core/auth.service";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isDataLoaded: boolean = false;
  public isLoading;

  constructor(
    private dataService: DataService,
    private userService: UserService,
    private authService: AuthService,
    private uploadService: UploadService) { }

  public ngOnInit() {
    this.isDataLoaded = false;
    this.isLoading = true;
    this.directTheUser();
  }

  private directTheUser() {
    this.userService.getUser(this.authService.currentUserId)
      .subscribe((user) => {
        this.redirectIfNewUser(user);
        this.loadUserImage(user);
      }, err => {
        this.handleError();
      });
  }

  private redirectIfNewUser(user: any) {
    this.dataService.user = user;
    if (this.dataService.user.isNew != null && this.dataService.user.isNew) {
      this.dataService.navigate("/new-profile");
    }
  }

  private loadUserImage(user: any) {
    this.uploadService.getUserProfileImageUrl(user.$key).getDownloadURL()
      .then(url => {
        this.setUserImage(url);
      }).catch((error) => {
        this.setUserImage(null);
      });
  }

  private setUserImage(image: any) {
    try {
      this.dataService.setPwUserImage(image);
      this.isDataLoaded = true;
      this.isLoading = false;
    } catch (e) {
      this.dataService.manageError(e.message, "home");
    }
  }

  private handleError() {
    this.isDataLoaded = true;
    this.isLoading = false;
    this.dataService.manageError("getUser home", "home");
  }

}