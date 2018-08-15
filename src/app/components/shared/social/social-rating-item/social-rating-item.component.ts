import { Component, OnInit, Input } from '@angular/core';
import { Rating } from "../../../../models/rating";
import { RatingService } from "../../../../services/rating.service";

@Component({
  selector: 'social-rating-item',
  templateUrl: './social-rating-item.component.html',
  styleUrls: ['./social-rating-item.component.css']
})
export class SocialRatingItemComponent implements OnInit {

  @Input("viewType")
  private viewType: string;
  @Input("rating")
  private rating: Rating;
  private isLightView: boolean = true;

  constructor(private ratingService: RatingService) { }

  ngOnInit() {
    this.setViewType();
  }

  private setViewType() {
    this.isLightView = (this.isViewTypeLight());
  }

  private isViewTypeLight(): boolean {
    return this.viewType == "light";
  }
}