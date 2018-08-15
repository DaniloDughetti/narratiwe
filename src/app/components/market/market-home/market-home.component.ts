import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { User } from '../../../models/user';


@Component({
  selector: 'market-home',
  templateUrl: './market-home.component.html',
  styleUrls: ['./market-home.component.css']
})
export class MarketHomeComponent implements OnInit {

  public user: User;
  public showNationComponent: boolean = false;

  /*
   * Traduzioni hard-coded 
   */
  public nationComponentTitle: string;
  public worldComponentTitle: string;
  public mostVotedComponentTitle: string;
  public uppestComponentTitle: string;
  public lastPrivateStoriesComponentTitle: string;
  public lastSharedStoriesComponentTitle: string;


  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.initMarketHome();
  }

  private initMarketHome() {
    try {
      this.user = this.dataService.user;
      if (this.isUserHavingAnAddress()) {
        this.showNationComponent = true;
        this.nationComponentTitle = this.user.address.state + " best writers";
      }
    }
    catch (e) {
      this.dataService.manageError(e.message, "market-home");
    }
  }

  private isUserHavingAnAddress(){
    return this.user.address != null && this.user.address.state != '';
  }
}
