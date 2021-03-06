import { Pipe, PipeTransform } from '@angular/core';
import { Story } from "../models/story";

@Pipe({
  name: 'storyDatepublished'
})
export class StoryDatepublishedPipe implements PipeTransform {

  transform(array: Story[]): Story[] {
    array.sort((a: Story, b: Story) => {
      if (a.dateEditing > b.dateEditing) {
        return -1;
      } else if (a.dateEditing < b.dateEditing) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
