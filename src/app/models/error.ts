export class Error{
    $key: string;
    time: number;
    user: string;
    message: string;
    page: string;

    constructor(time: number, user: string, message: string, page:string) {
        this.time = time;
        this.user = user;
        this.message = message;
        this.page = page;
    }
}