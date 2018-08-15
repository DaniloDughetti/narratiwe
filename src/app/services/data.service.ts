import { Injectable } from '@angular/core';
import { User } from "../models/user";
import { Story } from "../models/story";
import { Chapter } from "../models/chapter";
import { Search } from "../models/search";
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { AuthService } from './../core/auth.service';
import { MatSnackBar } from '@angular/material';
import { MatSnackBarConfig } from '@angular/material';
import { Error } from "../models/error";
import { Abuse } from "../models/abuse";
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class DataService {
  
  private errorBasePath: string = '/errors';
  private errors: FirebaseListObservable<Error[]> = null;


  private abuseBasePath: string = '/abuses';
  private abuses: FirebaseListObservable<Abuse[]> = null;

  private sessionUser: User;
  public isDataLoaded: boolean = false;
  /**
   *  pw = present working
   *  Temporary object, used to pass information between components
   */
  private pwUser: User;
  private pwStory: Story;
  private pwChapter: Chapter;
  private pwChapters: Chapter[];
  private pwChapterLastIndex: number;
  private pwUserImage: string;
  private defaultUserImage: string = "../../assets/images/profile.png";
  private pwSearch: Search;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router,
    public snackBar: MatSnackBar,
    private db: AngularFireDatabase) { 
      this.resetPwVariables();
    }

  get getUserService(): UserService{
    return this.userService;
  }
  get getAuthService(): AuthService{
    return this.auth;
  }

  resetPwVariables(): void{
    this.pwUser = null;
    this.pwStory = null;
    this.pwChapter = null;
    this.pwChapters = [];
    this.pwChapterLastIndex = 0;
    this.pwUserImage = null;
    this.defaultUserImage = null;
    this.pwSearch = null;
  }
  
  resetEnvironmentVariables(): void{
    localStorage.removeItem('user');
    this.sessionUser = null;
  }

  getPwUser() : User {
    return this.pwUser;
  }

  setPwUser(user: User) : void {
    this.pwUser = user;
  }

  getPwStory() : Story {
    return this.pwStory;
  }

  setPwStory(story: Story) : void {
    this.pwStory = story;
  }

  getPwChapter() : Chapter {
    return this.pwChapter;
  }

  setPwChapter(chapter: Chapter) : void {
    this.pwChapter = chapter;
  }
  
  getPwChapters() : Chapter[] {
    return this.pwChapters;
  }

  setPwChapters(chapters: Chapter[]) : void {
    this.pwChapters = chapters;
  }
  
  setPwChapterLastIndex(index: number) : void {
    this.pwChapterLastIndex = index;
  }
  
  getSwChapterLastIndex() : number {
    return this.pwChapterLastIndex;
  }

  setPwSearch(search: Search) : void {
    this.pwSearch = search;
  }
  
  getPwSearch() : Search {
    return this.pwSearch;
  }

  getPwUserImage(): string{
    if(this.pwUserImage == null){
      return this.defaultUserImage;      
    }
    else{
      return this.pwUserImage;
    }
  }

  setPwUserImage(image:string){
    if(image != null){
      this.pwUserImage = image;
    }else{
      this.pwUserImage = this.getDefaultUserImage();
    }
  }

  public getDefaultUserImage(){
    return "../../assets/images/profile.png";
  }

  public getDefaultUserImagePath(path: string){
    return path + "/assets/images/profile.png";
  }

  get user():User { 
    if(this.sessionUser == null)
      return JSON.parse(localStorage.getItem('user'));
    else
      return this.sessionUser;
  }

  set user(user: User) { 
    this.sessionUser = user;
    localStorage.setItem('user', JSON.stringify(this.sessionUser));
  } 

  navigate(routeUrl){
    this.router.navigate([routeUrl]);
  }

  navigateWithParameter(routeUrl, parameter){
    this.router.navigate([routeUrl, parameter]);
  }

  openCustomSnackBar(message: string, type: string, action?: string) {
    let config = new MatSnackBarConfig();
    if (type == 'error') {
      config.extraClasses = ['error-class'];
    } else {
      config.extraClasses = ['info-class'];
    }
    config.duration = 1500;
    this.snackBar.open(message, action ? 'Action Label' : undefined, config)
  }

  createError(error: Error) {
    this.errors = this.db.list(this.errorBasePath);
    return this.errors.push(error);
  }

  manageError(message: string, page: string){
    let error: Error = new Error(new Date().getTime(), this.auth.currentUserId, message, page);
    this.createError(error).then(() => this.navigate("**"))
    .catch(() => this.navigate("**"));
    
  }

  createAbuse(abuse: Abuse) {
    this.abuses = this.db.list(this.abuseBasePath);
    return this.abuses.push(abuse);
  }

  manageAbuse(chapter: string, chapterOwner: string, story: string){
    let abuse: Abuse = new Abuse(new Date().getTime(), this.auth.currentUserId, chapter, chapterOwner, story);
    this.createAbuse(abuse).then(() => this.openCustomSnackBar("Chapter reported", 'info'))
    .catch(() => this.navigate("**"));
    
  }
}
