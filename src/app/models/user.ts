import { Address } from "./address";
import { ReadChronology } from "./readChronology";
import { Rating } from "./rating";

export class User{
    $key: string;
    email: string;
    name: string;
    surname: string;
    nickname: string;
    birthday: number;
    address: Address;
    language: string;
    readChronology: ReadChronology[];
    favoriteStories: string[];
    ratingSummary: Rating;
    ratingNumber: number;
    systemLanguage: string;
    storyLanguage: string;
    showNickname: boolean;
    isNew: boolean;
}