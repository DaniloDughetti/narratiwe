import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Upload } from "../shared/upload";
import { UploadService } from "../shared/upload.service";
import { DataService } from "../../services/data.service";
import * as _ from "lodash";
import 'firebase/storage';

@Component({
  selector: 'upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  private selectedFiles: FileList;
  private currentUpload: Upload;

  @Input('namefile') 
  private namefile: string;

  @Output()
  public uploadResult = new EventEmitter();

  constructor(private upSvc: UploadService, private dataService: DataService) { }
  
  detectFiles(event) {
      this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    this.initFile();
    this.upSvc.pushUpload(this.currentUpload);
    this.uploadResult.emit(this.currentUpload);
  }

  uploadUserImage() {
    this.initFile();
    this.upSvc.pushUserUpload(this.currentUpload, this.dataService.user.$key, "profile"); 
    this.uploadResult.emit(this.currentUpload);
  }

  uploadCustomUserImage() {
    this.initFile();
    this.upSvc.pushUserUpload(this.currentUpload, this.dataService.user.$key, this.namefile);
    this.uploadResult.emit(this.currentUpload);    
  }

  uploadMulti() {
    let files = this.selectedFiles
    let filesIndex = _.range(files.length)
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(files[idx]);
      this.upSvc.pushUpload(this.currentUpload);
    }
    )
  }
  
  private initFile() {
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
  }

  ngOnInit() {
  }
}
