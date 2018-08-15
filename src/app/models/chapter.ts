import { Rating } from "./rating";

export class Chapter{
    $key: string;
    title: string;
    story: string;
    user: string;
    dateCreation: number;
    dateEditing: number;
    type: string;
    index: number;
    content: string;
    ratingSummary: Rating;
    ratingNumber: number;
}