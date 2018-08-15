import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Upload } from './upload';

@Injectable()
export class UploadService {

  constructor(private db: AngularFireDatabase) { }
  private basePath:string = '/uploads';

  uploads: FirebaseListObservable<Upload[]>;

  pushUpload(upload: Upload) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100
      },
      (error) => {
      },
      () => {
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.saveFileData(upload);
      }
    );
  }

  pushUserUpload(upload: Upload, userUID: string, fileName: string) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${userUID}/${fileName}`).put(upload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100
      },
      (error) => {
      },
      () => {
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = fileName;
        this.db.list(`${this.basePath}/${userUID}/${fileName}`).push(upload);
      }
    );
  }

  private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
  }

  deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
    .then( () => {
      this.deleteFileStorage(upload.name)
    });
  }
  
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  private deleteFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }

  getImageUrl(name: string): any{
    return firebase.storage().ref().child('uploads/' + name);
  }

  getUserProfileImageUrl(userUID: string): any{
    return firebase.storage().ref().child('uploads/' + userUID + '/' + "profile");
  }

  getUserCustomImageUrl(userUID: string, fileName: string): any{
    return firebase.storage().ref().child('uploads/' + userUID + '/' + fileName);
  }

}
