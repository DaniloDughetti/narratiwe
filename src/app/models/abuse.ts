export class Abuse{
    $key: string;
    time: number;
    userFrom: string;
    chapter: string;
    chapterOwner: string;
    story: string;

    constructor(time: number, userFrom: string, chapter:string, chapterOwner: string, story: string) {
        this.time = time;
        this.userFrom = userFrom;
        this.chapter = chapter;
        this.chapterOwner = chapterOwner;
        this.story = story;
    }
}