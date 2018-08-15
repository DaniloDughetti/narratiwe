import { Pipe, PipeTransform } from '@angular/core';
import { Chapter } from "../models/chapter";

@Pipe({
  name: 'chapterIndex'
})
export class ChapterIndexPipe implements PipeTransform {

  transform(array: Chapter[]): Chapter[] {
    array.sort((a: Chapter, b: Chapter) => {
      if (a.index < b.index) {
        return -1;
      } else if (a.index > b.index) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

}
