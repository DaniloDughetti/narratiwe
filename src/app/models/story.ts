import { Rating } from "./rating";

export class Story{
    $key: string;
    title: string;
    description: string;
    kind: string;
    dateCreation: number;
    dateEditing: number;
    language: string;
    user: string;
    type: string;
    image: string;
    visibility: string;
    datePublished: number;
    upsNumber: number;
    ratingSummary: Rating;
    ratingNumber: number;
}