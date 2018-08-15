import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../services/data.service";
import { User } from "../../models/user";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private profileImage: string;
  private user: User;
  private read: boolean;
  private write: boolean;
  private market: boolean;
  private settings: boolean;
  private profile: boolean;
  private userNameCondition1: boolean = false;
  private userNameCondition2: boolean = false;
  @Input("isNew")
  public isNew: boolean;

  constructor(private dataService: DataService) { }
  
  ngOnInit() {
    if(!this.isNew){
      this.profileImage = this.dataService.getPwUserImage();
      this.user = this.dataService.user;
      this.userNameCondition1 = (this.isCondition1Valid());
      this.userNameCondition2 = (this.isCondition2Valid());
  
    }
  }

  private isCondition2Valid(): boolean {
    return (this.user.name == null || this.user.name == '') && (this.user.surname == null && this.user.surname == '');
  }

  private isCondition1Valid(): boolean {
    return (this.user.name != null && this.user.surname != null) || (this.user.name != '' && this.user.surname != '');
  }

  public refreshImage(){
    this.profileImage = this.dataService.getPwUserImage();
  }

  public clickedLink(linkName: string){
    if(linkName == 'write'){
      if(!this.write)
        this.dataService.navigate("/home/write");
      this.setLink(true, false, false, false, false);
    }
    if(linkName == 'read'){
      if(!this.read)
        this.dataService.navigate("/home/read");
      this.setLink(false, true, false, false, false);
    }
    if(linkName == 'market'){
      if(!this.market)
        this.dataService.navigate("/home/market");
      this.setLink(false, false, true, false, false);
    }
    if(linkName == 'settings'){
      if(!this.settings)
        this.dataService.navigate("/home/settings");
      this.setLink(false, false, false, true, false);
    }
    if(linkName == 'profile'){
      if(!this.profile)
        this.dataService.navigate("/home/profile/profile-home");
      this.setLink(false, false, false, false, true);
    }
    
  }

  public setLink(write: boolean, read: boolean, market: boolean, settings: boolean, profile: boolean){
    this.write = write;
    this.read = read;
    this.market = market;
    this.settings = settings;
    this.profile = profile;
  }

}
