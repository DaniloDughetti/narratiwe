import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { ChapterComment } from '../models/chapterComment';

@Injectable()
export class ChapterCommentService {
  private basePath: string = '/chapterComments';

  private chapterComments: FirebaseListObservable<ChapterComment[]> = null; //  list of objects
  private chapterComment: FirebaseObjectObservable<ChapterComment> = null; //   single object

  constructor(private db: AngularFireDatabase) {
  }

  getChapterCommentList(inputQuery = {}): FirebaseListObservable<ChapterComment[]> {
    this.chapterComments = this.db.list(this.basePath, {
      query: inputQuery
    });
    return this.chapterComments;
  }

  getChapterComment(key: string): FirebaseObjectObservable<ChapterComment> {
    const storyPath = `${this.basePath}/${key}`;
    this.chapterComment = this.db.object(storyPath);
    return this.chapterComment;
  }

  createChapterComment(chapterComment: ChapterComment) {
    this.chapterComments = this.db.list('chapterComments');
    return this.chapterComments.push(chapterComment);
  }

  updateChapterComment(key: string, value: any) {
    return this.getChapterComment(key).update(value);
  }

  deleteChapterComment(key: string) {
    return this.chapterComments.remove(key);
  }

  private handleError(error) {
    console.log(error)
  }
}
