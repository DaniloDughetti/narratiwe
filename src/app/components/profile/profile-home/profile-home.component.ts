import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { User } from '../../../models/user';

@Component({
  selector: 'profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.css']
})
export class ProfileHomeComponent implements OnInit {

  private user: User;
  private titleComponentMyStories: string;
  private titleComponentMostUps: string;
  private titleComponentMostRated: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.initProfileHome();
  }

  private initProfileHome() {
    try {
      this.user = this.dataService.user;
      this.completeTitles();
    }
    catch (e) {
      this.dataService.manageError(e.message, "profile-home");
    }
  }

  private completeTitles(): void {
    this.titleComponentMyStories = this.user.name + " " + this.user.surname + " stories";
    this.titleComponentMostUps = this.user.name + " " + this.user.surname + " most ups stories";
    this.titleComponentMostRated = this.user.name + " " + this.user.surname + " most rated stories";
  }
}
