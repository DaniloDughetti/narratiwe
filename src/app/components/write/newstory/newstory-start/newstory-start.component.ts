import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { UploadFormComponent } from '../../../../uploads/upload-form/upload-form.component';

@Component({
  selector: 'newstory-start',
  templateUrl: './newstory-start.component.html',
  styleUrls: ['./newstory-start.component.css']
})
export class NewstoryStartComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  public startPrivateStory(): void{
    this.dataService.navigateWithParameter('/home/write/newstory-start-edit', 'private');
  }

  public startSharedStory(): void{
    this.dataService.navigateWithParameter('/home/write/newstory-start-edit', 'shared');
  }

}
