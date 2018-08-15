import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Up } from '../models/up';

@Injectable()
export class UpService {
  private basePath: string = '/ups';
  
    private ups: FirebaseListObservable<Up[]> = null;
    private up: FirebaseObjectObservable<Up> = null;
  
    constructor(private db: AngularFireDatabase) { 
    }
   
    getUpList(inputQuery = {}): FirebaseListObservable<Up[]> {
      this.ups = this.db.list(this.basePath, {
        query: inputQuery
      });
      return this.ups;
    }
    
    getUp(key: string): FirebaseObjectObservable<Up> {
      const storyPath =  `${this.basePath}/${key}`;
      this.up = this.db.object(storyPath);
      return this.up;
    }
  
    createUp(up: Up) {
      this.ups = this.db.list('ups');
      return this.ups.push(up);
    }
    
    updateUp(key: string, value: any) {
        return this.getUp(key).update(value);
    }
  
    deleteUp(key: string) {
        return this.ups.remove(key);
    }
    
    private handleError(error) {
      console.log(error);
    }

}
