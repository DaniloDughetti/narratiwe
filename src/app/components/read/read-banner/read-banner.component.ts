import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'read-banner',
  templateUrl: './read-banner.component.html',
  styleUrls: ['./read-banner.component.css']
})
export class ReadBannerComponent implements OnInit {

  @Input('story')
  private storyId: string;
  @Input('isShared')
  private isShared: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  private goToStory(){
    this.dataService.navigateWithParameter("/home/story-read", this.storyId);
  }
}
