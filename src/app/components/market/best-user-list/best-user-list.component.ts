import { Component, OnInit, Input } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { DataService } from "../../../services/data.service";
import { User } from "../../../models/user";
import { StoryUpsnumberPipe } from '../../../pipes/story-upsnumber.pipe';
import { CountryService } from '../../../services/country.service'
import { Rating } from '../../../models/rating';

@Component({
  selector: 'best-user-list',
  templateUrl: './best-user-list.component.html',
  styleUrls: ['./best-user-list.component.css']
})
export class BestUserListComponent implements OnInit {

  private users: User[];
  private showedMore: boolean = false;
  private isListLoading: boolean = true;
  @Input('initialRecords')
  private initialRecords: number;
  @Input('componentTitle')
  private componentTitle: string;
  @Input('showMoreButton')
  private showMoreButton: boolean;
  @Input('nation')
  private nation: string;
  private tempRecords: number;
  private isListEmpty = true;

  constructor(private dataService: DataService,
    private userService: UserService,
    private countryService: CountryService) { }

  ngOnInit() {
    this.initBestUserList();
  }

  private initBestUserList() {
    try {
      this.initNation();
      if (this.nation != 'All')
        this.getAllNationUser();
      else
        this.getSpecificNationUser();
    }
    catch (e) {
      this.dataService.manageError(e.message, "best-user-list.component");
    }
  }

  private getSpecificNationUser() {
    this.userService.getUserList({
      orderByChild: 'ratingNumber',
      limitTo: 100
    }).subscribe((users) => {
      this.setUserListSpecificNation(users);
    });
  }

  private setUserListSpecificNation(users: User[]) {
    let tempUsers: User[] = [];
    if (users != null) {
      for (let i = 0; i < users.length; i++) {
        tempUsers.push(users[i]);
        if (tempUsers[i].ratingSummary == null) {
          tempUsers[i].ratingSummary = new Rating();
          tempUsers[i].ratingSummary.total = 0;
        }
      }
    }
    this.users = tempUsers;
    this.tempRecords = this.initialRecords;
    this.isListLoading = false;
    this.isListEmpty = (this.users.length == 0);
  }

  private getAllNationUser() {
    this.userService.getUserList({
      orderByChild: 'ratingNumber',
      limitTo: 100
    }).subscribe((users) => {
      this.setUserListAllNation(users);
    });
  }

  private setUserListAllNation(users: User[]) {
    let tempUsers: User[] = [];
    if (users != null) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].ratingSummary == null) {
          users[i].ratingSummary = new Rating();
          users[i].ratingSummary.total = 0;
        }
        if (users[i].address != null &&
          users[i].address.state != '' &&
          users[i].address.state == this.nation)
          tempUsers.push(users[i]);
      }
    }
    this.users = tempUsers;
    this.tempRecords = this.initialRecords;
    this.isListLoading = false;
    this.isListEmpty = (this.users.length == 0);
  }

  private initNation() {
    if (this.nation == null) {
      this.nation = 'All';
    }
  }

  private showMoreStories() {
    this.tempRecords = this.users.length;
    this.showedMore = !this.showedMore;
  }

  private showLessStories() {
    this.tempRecords = this.initialRecords;
    this.showedMore = !this.showedMore;
  }

  private showUserPreview(id: string): void {
    this.dataService.navigateWithParameter('/home/profile/view-general', id);
  }

}
