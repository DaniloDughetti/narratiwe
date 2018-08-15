import { Component, OnInit, Input } from '@angular/core';
import { User } from "../../../models/user";
import { DataService } from "../../../services/data.service";
import { UploadService } from '../../../uploads/shared/upload.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'user-item-light',
  templateUrl: './user-item-light.component.html',
  styleUrls: ['./user-item-light.component.css']
})
export class UserItemLightComponent implements OnInit {

  @Input('user')
  private user: User;
  @Input('vote')
  private vote: number;
  @Input('showVote')
  private showVote: boolean;
  private userImage: string;
  private isLoading: boolean = true;
  private isImageLoading: boolean = true;

  constructor(private dataService: DataService,
    private uploadService: UploadService) { }

  ngOnInit() {
    try{
    this.getUserImage();
    } catch (e) {
      this.dataService.manageError(e.message, "user-item-light.component");
    }
  }

  private getUserImage() {
    this.uploadService.getUserProfileImageUrl(this.user.$key).getDownloadURL()
      .then(url => {
        this.userImage = url;
        this.setEnvironmentFlag();
      }).catch(() => {
        this.userImage = null;
        this.setEnvironmentFlag();
      });
  }

  private setEnvironmentFlag() {
    this.isImageLoading = false;
    this.isLoading = false;
  }
}
