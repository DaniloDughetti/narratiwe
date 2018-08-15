import { Pipe, PipeTransform } from '@angular/core';
import { Story } from "../models/story";

@Pipe({
  name: 'storyUpsnumber'
})
export class StoryUpsnumberPipe implements PipeTransform {

  transform(array: Story[]): Story[] {
    array.sort((a: Story, b: Story) => {
      if (a.upsNumber >= b.upsNumber) {
        return -1;
      } else if (a.upsNumber < b.upsNumber) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
