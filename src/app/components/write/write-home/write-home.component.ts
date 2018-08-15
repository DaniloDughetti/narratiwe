import { Component, OnInit } from '@angular/core';
import { User } from "../../../models/user";
import { DataService } from "../../../services/data.service";

@Component({
  selector: 'write-home',
  templateUrl: './write-home.component.html',
  styleUrls: ['./write-home.component.css']
})
export class WriteHomeComponent implements OnInit {

  private user:User;
  
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.setCurrentUser();
  }


  private setCurrentUser() {
    this.user = this.dataService.user;
  }
}
