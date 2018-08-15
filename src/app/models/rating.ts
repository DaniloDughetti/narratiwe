export class Rating{
    $key: string;
    chapter: string;
    user: string;
    dateEditing: number;
    grammar: number;
    inspiration: number;
    lexicon: number;
    consistency: number;
    total: number;

    constructor() {
        this.grammar = 0;
        this.inspiration = 0;
        this.lexicon = 0;
        this.consistency = 0;
        this.total = 0;
    }
}