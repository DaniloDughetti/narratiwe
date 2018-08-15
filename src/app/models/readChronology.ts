export class ReadChronology{
    story: string;
    chapter: string;
    dateEditing: number;

    constructor(story: string, chapter: string) {
        this.story = story;
        this.chapter = chapter;
        this.dateEditing = new Date().getTime();
    }
}