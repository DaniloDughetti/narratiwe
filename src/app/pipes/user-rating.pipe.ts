import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user'

@Pipe({
  name: 'userRating'
})
export class UserRatingPipe implements PipeTransform {
  transform(array: User[]): User[] {
    array.sort((a: User, b: User) => {
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