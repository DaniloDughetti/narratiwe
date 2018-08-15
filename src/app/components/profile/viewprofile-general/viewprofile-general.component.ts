import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { UserService } from "../../../services/user.service";
import { User } from "../../../models/user";


@Component({
  selector: 'viewprofile-general',
  templateUrl: './viewprofile-general.component.html',
  styleUrls: ['./viewprofile-general.component.css']
})
export class ViewprofileGeneralComponent implements OnInit {

  private sub: any;
  private userId: string;
  private user: User;
  private isLoading: boolean = true;
  private titleComponentMyStories: string;
  private titleComponentMostUps: string;
  private titleComponentMostRated: string;

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    this.initProfile();
  }


  private initProfile() {
    try {
      this.sub = this.route.params.subscribe(params => {
        this.userId = params['id'];
        this.getUser();
      });
    }
    catch (e) {
      this.dataService.manageError(e.message, "viewprofile-general.component");
    }
  }

  private getUser() {
    this.userService.getUser(this.userId)
      .subscribe((user) => {
        this.user = user;
        this.titleComponentMyStories = this.user.name + " " + this.user.surname + " stories";
        this.titleComponentMostUps = this.user.name + " " + this.user.surname + " most ups stories";
        this.titleComponentMostRated = this.user.name + " " + this.user.surname + " most rated stories";
        this.isLoading = false;
      });
  }
}
