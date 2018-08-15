import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Chapter } from '../models/chapter';

@Injectable()
export class ChapterService {
  private basePath: string = '/chapters';
  
    private chapters: FirebaseListObservable<Chapter[]> = null;
    private chapter: FirebaseObjectObservable<Chapter> = null;
  
    constructor(private db: AngularFireDatabase) { 
    }
  
    getChaptersList(inputQuery = {}): FirebaseListObservable<Chapter[]> {
      this.chapters = this.db.list(this.basePath, {
        query: inputQuery
      });
      return this.chapters;
    }
    
    getChapter(key: string): FirebaseObjectObservable<Chapter> {
      const storyPath =  `${this.basePath}/${key}`;
      this.chapter = this.db.object(storyPath);
      return this.chapter;
    }
  
    createChapter(chapter: Chapter) {
      this.chapters = this.db.list(this.basePath);
      return this.chapters.push(chapter);
    }
    
    updateChapter(key: string, value: any) {
        return this.getChapter(key).update(value);
    }
  
    deleteChapter(key: string) {
        return this.chapters.remove(key);
    }

    getChapterIndex(chapters: Chapter[], chapterId: string): number{
      if(chapters == null || chapters.length == 0)
        return 0;
      for(let i = 0; i < chapters.length; i++){
        if(chapters[i].$key == chapterId){
          return chapters[i].index;          
        }
      }
      return 0;
    }

    private handleError(error) {
      console.log(error)
    }
}
