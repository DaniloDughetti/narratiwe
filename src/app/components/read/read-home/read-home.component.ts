import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { User } from '../../../models/user';

@Component({
  selector: 'read-home',
  templateUrl: './read-home.component.html',
  styleUrls: ['./read-home.component.css']
})
export class ReadHomeComponent implements OnInit {

  private user: User;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.initUser();
  }

  private initUser() {
    this.user = this.dataService.user;
  }
}
