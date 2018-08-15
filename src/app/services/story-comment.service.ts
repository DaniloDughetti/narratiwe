import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { StoryComment } from '../models/storyComment';


@Injectable()
export class StoryCommentService {
  private basePath: string = '/storyComments';

  private storyComments: FirebaseListObservable<StoryComment[]> = null;
  private storyComment: FirebaseObjectObservable<StoryComment> = null;

  constructor(private db: AngularFireDatabase) {
  }

  getStoryCommentList(inputQuery = {}): FirebaseListObservable<StoryComment[]> {
    this.storyComments = this.db.list(this.basePath, {
      query: inputQuery
    });
    return this.storyComments;
  }

  getStoryComment(key: string): FirebaseObjectObservable<StoryComment> {
    const storyPath = `${this.basePath}/${key}`;
    this.storyComment = this.db.object(storyPath);
    return this.storyComment;
  }

  createStoryComment(storyComment: StoryComment) {
    this.storyComments = this.db.list('storyComments');
    return this.storyComments.push(storyComment);
  }

  updateStoryComment(key: string, value: any) {
    return this.getStoryComment(key).update(value);
  }

  deleteStoryComment(key: string) {
    return this.storyComments.remove(key);
  }

  private handleError(error) {
    console.log(error)
  }

}
