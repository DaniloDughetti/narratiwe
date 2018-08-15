import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { User } from '../models/user';
import { ReadChronology } from '../models/readChronology';

@Injectable()
export class UserService {

  private basePath: string = '/users';

  private users: FirebaseListObservable<User[]> = null;
  private user: FirebaseObjectObservable<User> = null;

  constructor(private db: AngularFireDatabase) {}

  getUserList(query = {}): FirebaseListObservable<User[]> {
    this.users = this.db.list(this.basePath, {
      query: query
    });
    return this.users;
  }

  getUser(key: string): FirebaseObjectObservable<User> {
    const userPath = `${this.basePath}/${key}`;
    this.user = this.db.object(userPath);
    return this.user;
  }

  createUser(user: User): void {
    this.users.push(user)
      .catch(error => this.handleError(error))
  }

  updateUser(key: string, value: any) {
    return this.getUser(key).update(value);
  }

  deleteUser(key: string): void {
    this.users.remove(key)
      .catch(error => this.handleError(error))
  }

  isInFavorites(user: User, storyId: string): boolean {
    for (let i = 0; i < user.favoriteStories.length; i++) {
      if (user.favoriteStories[i] == storyId)
        return true;
    }
    return false;
  }

  addFavorites(user: User, storyId: string): User {
    if (user.favoriteStories == null) {
      user.favoriteStories = [];
    }
    user.favoriteStories.push(storyId);
    return user;
  }

  removeFavorites(user: User, storyId: string): User {
    if (user.favoriteStories == null || user.favoriteStories.length == 0) {
      return user;
    }
    var index = user.favoriteStories.indexOf(storyId, 0);
    if (index > -1) {
      user.favoriteStories.splice(index, 1);
    }
    return user;
  }

  getLastChapterRead(user: User, storyId: string): string {
    if (user.readChronology == null)
      return null;

    for (let i = 0; i < user.readChronology.length; i++) {
      if (user.readChronology[i].story == storyId)
        return user.readChronology[i].chapter;
    }
    return null;
  }

  setLastChapterRead(user: User, storyId: string, chapterId: string): User {
    if (user.readChronology == null) {
      user.readChronology = [];
      user.readChronology.push(new ReadChronology(storyId, chapterId));
    } else {
      let isStoryAdded: boolean = false;
      for (let i = 0; i < user.readChronology.length; i++) {
        if (user.readChronology[i].story == storyId) {
          user.readChronology[i].chapter = chapterId;
          user.readChronology[i].dateEditing = new Date().getTime();
          isStoryAdded = true;
          break;
        }
      }
      if (!isStoryAdded){
        user.readChronology.push(new ReadChronology(storyId, chapterId));        
      }
    }
    return user;
  }

  removeChapterRead(user: User, storyId: string): User {
    if (user.readChronology == null || user.readChronology.length == 0) {
      return user;
    } 
    let index = 0;
    for(let i = 0; i < user.readChronology.length; i++){
      if(user.readChronology[i].story = storyId){
        index = i;
        break;
      }
    }
    if (index > -1) {
      user.readChronology.splice(index, 1);
    }
    return user;
  }

  private handleError(error) {
    console.log(error);
  }

}