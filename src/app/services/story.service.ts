import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Story } from '../models/story';

@Injectable()
export class StoryService {
  private basePath: string = '/stories';

  private stories: FirebaseListObservable<Story[]> = null;
  private story: FirebaseObjectObservable<Story> = null;

  constructor(private db: AngularFireDatabase) {
  }

  getStoryList(inputQuery = {}): FirebaseListObservable<Story[]> {
    this.stories = this.db.list(this.basePath, {
      query: inputQuery
    });
    return this.stories;
  }

  getStory(key: string): FirebaseObjectObservable<Story> {
    const storyPath = `${this.basePath}/${key}`;
    this.story = this.db.object(storyPath);
    return this.story;
  }

  createStory(story: Story) {
    this.stories = this.db.list('stories');
    return this.stories.push(story);
  }

  updateStory(key: string, value: any) {
    return this.getStory(key).update(value);
  }

  deleteStory(key: string) {
    return this.stories.remove(key);
  }

  getKindList(language: string) {
    if (language != null && language == "Italian") {
      return [
        { value: 'kind-0', viewValue: 'Generica' },
        { value: 'kind-1', viewValue: 'Azione' },
        { value: 'kind-2', viewValue: 'Drammatica' },
        { value: 'kind-3', viewValue: 'Satirica' },
        { value: 'kind-4', viewValue: 'Romanzo' },
        { value: 'kind-5', viewValue: 'Mistero' },
        { value: 'kind-6', viewValue: 'Horror' },
        { value: 'kind-7', viewValue: 'Crescita personale' },
        { value: 'kind-8', viewValue: 'Salute' },
        { value: 'kind-9', viewValue: 'Guida' },
        { value: 'kind-10', viewValue: 'Viaggi' },
        { value: 'kind-11', viewValue: 'Per bambini' },
        { value: 'kind-12', viewValue: 'Spirituale' },
        { value: 'kind-13', viewValue: 'Poesia' },
        { value: 'kind-14', viewValue: 'Scienza' },
        { value: 'kind-15', viewValue: 'Storia' },
        { value: 'kind-16', viewValue: 'Matematica' },
        { value: 'kind-17', viewValue: 'Informatica' },
        { value: 'kind-18', viewValue: 'Ricette' },
        { value: 'kind-19', viewValue: 'Diari' },
        { value: 'kind-20', viewValue: 'Fantasy' },
        { value: 'kind-21', viewValue: 'Biografia' },
        { value: 'kind-22', viewValue: 'Autobiografia' },
        { value: 'kind-23', viewValue: 'Artistica' },
        { value: 'kind-24', viewValue: 'Fiction scientifica' }
      ];
    } else {
      return [
        { value: 'kind-0', viewValue: 'General' },
        { value: 'kind-1', viewValue: 'Action' },
        { value: 'kind-2', viewValue: 'Drama' },
        { value: 'kind-3', viewValue: 'Satire' },
        { value: 'kind-4', viewValue: 'Romance' },
        { value: 'kind-5', viewValue: 'Mystery' },
        { value: 'kind-6', viewValue: 'Horror' },
        { value: 'kind-7', viewValue: 'Personal development' },
        { value: 'kind-8', viewValue: 'Health' },
        { value: 'kind-9', viewValue: 'Guide' },
        { value: 'kind-10', viewValue: 'Travel' },
        { value: 'kind-11', viewValue: 'Children\'s' },
        { value: 'kind-12', viewValue: 'Spirituality' },
        { value: 'kind-13', viewValue: 'Poetry' },
        { value: 'kind-14', viewValue: 'Science' },
        { value: 'kind-15', viewValue: 'History' },
        { value: 'kind-16', viewValue: 'Math' },
        { value: 'kind-17', viewValue: 'Computer science and technology' },
        { value: 'kind-18', viewValue: 'Cookbooks' },
        { value: 'kind-19', viewValue: 'Diary' },
        { value: 'kind-20', viewValue: 'Fantasy' },
        { value: 'kind-21', viewValue: 'Biography' },
        { value: 'kind-22', viewValue: 'Autobiography' },
        { value: 'kind-23', viewValue: 'Art' },
        { value: 'kind-24', viewValue: 'Science fiction' }
      ];
    }
  }

  getKindValue(value: string, language: string): string {
    if (language != null && language == "Italian") {
      switch (value) {
        case "kind-0":
          return "Generico";
        case "kind-1":
          return "Azione";
        case "kind-2":
          return "Drammatico";
        case "kind-3":
          return "Satirica";
        case "kind-4":
          return "Romanzo";
        case "kind-5":
          return "Mistero";
        case "kind-6":
          return "Horror";
        case "kind-7":
          return "Crescita personale";
        case "kind-8":
          return "Salute";
        case "kind-9":
          return "Guida";
        case "kind-10":
          return "Viaggi";
        case "kind-11":
          return "Per bambini";
        case "kind-12":
          return "Spirituale";
        case "kind-13":
          return "Poesia";
        case "kind-14":
          return "Scienza";
        case "kind-15":
          return "Storia";
        case "kind-16":
          return "Matematica";
        case "kind-17":
          return "Informatica";
        case "kind-18":
          return "Ricette";
        case "kind-19":
          return "Diari";
        case "kind-20":
          return "Fantasy";
        case "kind-21":
          return "Biografia";
        case "kind-22":
          return "Autobiografia";
        case "kind-23":
          return "Artistica";
        case "kind-24":
          return "Fiction scientifica";
        default:
          return "Generico";
      }
    } else {
      switch (value) {
        case "kind-0":
          return "General";
        case "kind-1":
          return "Action";
        case "kind-2":
          return "Drama";
        case "kind-3":
          return "Satire";
        case "kind-4":
          return "Romance";
        case "kind-5":
          return "Mystery";
        case "kind-6":
          return "Horror";
        case "kind-7":
          return "Personal development";
        case "kind-8":
          return "Health";
        case "kind-9":
          return "Guide";
        case "kind-10":
          return "Travel";
        case "kind-11":
          return "Children\'s";
        case "kind-12":
          return "Spirituality";
        case "kind-13":
          return "Poetry";
        case "kind-14":
          return "Science";
        case "kind-15":
          return "History";
        case "kind-16":
          return "Math";
        case "kind-17":
          return "Computer science and technology";
        case "kind-18":
          return "Cookbooks";
        case "kind-19":
          return "Diary";
        case "kind-20":
          return "Fantasy";
        case "kind-21":
          return "Biography";
        case "kind-22":
          return "Autobiography";
        case "kind-23":
          return "Art";
        case "kind-24":
          return "Science fiction";
        default:
          return "General";
      }
    }

  }

  decrementUpNumber(story: Story): Story {
    if (story.upsNumber > 0)
      story.upsNumber = story.upsNumber - 1;
    else
      story.upsNumber = 0;

    return story;
  }

  incrementUpNumber(story: Story): Story {
    if (story.upsNumber == null) {
      story.upsNumber = 1;
      return story;
    }

    story.upsNumber = story.upsNumber + 1;
    return story;
  }

  private handleError(error) {
    console.log(error)
  }

}
