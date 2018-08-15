import { Pipe, PipeTransform } from '@angular/core';
import { Story } from "../models/story";

@Pipe({
  name: 'storyRatingstotal'
})
export class StoryRatingstotalPipe implements PipeTransform {

  transform(array: Story[]): Story[] {
    array.sort((a: Story, b: Story) => {
      try{
        if (a.ratingSummary.total >= b.ratingSummary.total) {
          return -1;
        } else if (a.ratingSummary.total < b.ratingSummary.total) {
          return 1;
        } else {
          return 0;
        }
      }catch(e){
        return 0;
      }
      
    });
    return array;
  }
}