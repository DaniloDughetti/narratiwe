import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Rating } from '../models/rating';

@Injectable()
export class RatingService {
  private basePath: string = '/ratings';

  ratings: FirebaseListObservable<Rating[]> = null;
  rating: FirebaseObjectObservable<Rating> = null;

  constructor(private db: AngularFireDatabase) {
  }

  getRatingList(inputQuery = {}): FirebaseListObservable<Rating[]> {
    this.ratings = this.db.list(this.basePath, {
      query: inputQuery
    });
    return this.ratings;
  }

  getRating(key: string): FirebaseObjectObservable<Rating> {
    const storyPath = `${this.basePath}/${key}`;
    this.rating = this.db.object(storyPath);
    return this.rating;
  }

  createRating(rating: Rating) {
    this.ratings = this.db.list('ratings');
    return this.ratings.push(rating);
  }

  updateRating(key: string, value: any) {
    return this.getRating(key).update(value);
  }

  deleteRating(key: string) {
    return this.ratings.remove(key);
  }

  addAverageRating(target: Rating, voted: Rating, ratingNumber: number): Rating {
    target = this.initRating(target);
    this.setRatingConsistency(target, voted, ratingNumber);
    this.setRagingGrammar(target, voted, ratingNumber);
    this.setRagingInspiration(target, voted, ratingNumber);
    this.setRatingLexicon(target, voted, ratingNumber);
    this.setRatingTotal(target, voted, ratingNumber);
    return target;
  }

  private setRatingTotal(target: Rating, voted: Rating, ratingNumber: number) {
    if (target.total == 0)
      target.total = voted.total;
    else
      target.total = (target.total + voted.total) / ratingNumber;
  }

  private setRatingLexicon(target: Rating, voted: Rating, ratingNumber: number) {
    if (target.lexicon == 0)
      target.lexicon = voted.lexicon;
    else
      target.lexicon = (target.lexicon + voted.lexicon) / ratingNumber;
  }

  private setRagingInspiration(target: Rating, voted: Rating, ratingNumber: number) {
    if (target.inspiration == 0)
      target.inspiration = voted.inspiration;
    else
      target.inspiration = (target.inspiration + voted.inspiration) / ratingNumber;
  }

  private setRagingGrammar(target: Rating, voted: Rating, ratingNumber: number) {
    if (target.grammar == 0)
      target.grammar = voted.grammar;
    else
      target.grammar = (target.grammar + voted.grammar) / ratingNumber;
  }

  private setRatingConsistency(target: Rating, voted: Rating, ratingNumber: number) {
    if (target.consistency == 0)
      target.consistency = voted.consistency;
    else
      target.consistency = (target.consistency + voted.consistency) / ratingNumber;
  }
  
  private initRating(target: Rating) {
    if (target == null)
      target = new Rating();
    return target;
  }

  private handleError(error) {
    console.log(error)
  }

  private logRating(rating:Rating){
    console.log("consistency " + rating.consistency);
    console.log("grammar " + rating.grammar);
    console.log("lexicon " + rating.lexicon);
    console.log("inspiration " + rating.inspiration);
    console.log("total " + rating.total);
  }
}

