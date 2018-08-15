import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../../../../models/story';
import { User } from '../../../../models/user';
import { Rating } from '../../../../models/rating';
import { Up } from '../../../../models/up';
import { DataService } from '../../../../services/data.service';
import { UpService } from '../../../../services/up.service';


@Component({
  selector: 'social-story-summary',
  templateUrl: './social-story-summary.component.html',
  styleUrls: ['./social-story-summary.component.css']
})
export class SocialStorySummaryComponent implements OnInit {

  @Input("story")
  private story: Story;
  private ups: Up[];
  private isLoading: boolean = true;
  private isDataExisting: boolean = false;
  private upsNumber: number = 0;
  private rating: Rating;

  constructor(private dataService: DataService,
    private upService: UpService) { }

  ngOnInit() {
    this.setSummary();
  }


  private setSummary() {
    try {
      if (this.story == null) {
        this.isDataExisting = false;
        this.isLoading = false;
      }
      else {
        this.setRating();
        this.getUpList();
      }
      this.isDataExisting = true;
    }
    catch (e) {
      this.dataService.manageError(e.message, "social-story-summary.component");
    }
  }

  private setRating() {
    this.rating = this.story.ratingSummary;
  }

  private getUpList() {
    this.upService.getUpList({
      orderByChild: 'story',
      equalTo: this.story.$key,
    }).subscribe((ups) => {
      this.setUps(ups);
    });
  }

  private setUps(ups: any) {
    this.ups = ups;
    this.upsNumber = this.ups.length;
    this.isLoading = false;
  }
}
