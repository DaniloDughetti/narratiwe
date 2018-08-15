import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { CountryService } from '../services/country.service';

@Injectable()
export class AuthService {
    authState: any = null;
    
    constructor(private afAuth: AngularFireAuth,
      private db: AngularFireDatabase,
      private router: Router,
      private countryService: CountryService) {
        this.refreshAuthState();
    }

    public refreshAuthState(){
      this.afAuth.authState.subscribe((auth) => {
        this.authState = auth;
      });
    }

    get authenticated(): boolean {
      return this.authState !== null;
    }
  
    get currentUser(): any {
      return this.authenticated ? this.authState : null;
    }
  
    get currentUserObservable(): any {
      return this.afAuth.authState
    }
  
    get currentUserId(): string {
      return this.authenticated ? this.authState.uid : '';
    }
  
    currentUserDisplayName(): string {
      if (!this.authState)
        return 'Guest'
      else 
        return this.authState['displayName'] || 'User without a Name';
    }
    
    githubLogin() {
      const provider = new firebase.auth.GithubAuthProvider();
      return this.socialSignIn(provider);
    }
  
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      return this.socialSignIn(provider);
    }
  
    facebookLogin() {
      const provider = new firebase.auth.FacebookAuthProvider();
      return this.socialSignIn(provider);
    }
  
    twitterLogin() {
      const provider = new firebase.auth.TwitterAuthProvider();
      return this.socialSignIn(provider);
    }
  
    private socialSignIn(provider) {
      return this.afAuth.auth.signInWithPopup(provider)
        .then((credential) => {
          this.authState = credential.user;
          this.updateUserDataLogin();
        })
        .catch(error => console.log(error));
    }
  
    emailSignIn(email: string, password: string) {
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
          this.authState = user;
          this.updateUserData();
        });
    }
  
    emailLogin(email: string, password: string) {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          this.authState = user;         
          this.updateUserDataLanguage();
        });
    }
  
    resetPassword(email: string) {
      const fbAuth = firebase.auth();
      return fbAuth.sendPasswordResetEmail(email)
        .then(() => console.log('email sent'))
        .catch((error) => console.log(error))
    }
  
    signOut(): void {
      sessionStorage.clear();
      this.afAuth.auth.signOut();
      this.router.navigate(['/']);
    }
  
    private updateUserDataLogin(): void {
      let userLang: String = this.countryService.getLocalLanguage();
      const path = `users/${this.currentUserId}`;
      const data = {
        email: this.authState.email
      }
  
      this.db.object(path).update(data)
        .catch(error => console.log(error));
    }

    public updateUserData(): void {
      let userLang: String = this.countryService.getLocalLanguage();
      const path = `users/${this.currentUserId}`;
      const data = {
        email: this.authState.email,
        name: this.authState.displayName,
        storyLanguage: userLang,
        systemLanguage: 'English',        
        showNickname: false,
      }
  
      this.db.object(path).update(data)
        .catch(error => console.log(error));
    }

    private updateUserDataLanguage(): void {
      let userLang: String = this.countryService.getLocalLanguage();
      const path = `users/${this.currentUserId}`;
      const data = {
        systemLanguage: userLang
      }
      this.db.object(path).update(data)
        .catch(error => console.log(error));
    }

    navigate(routeUrl){
      this.router.navigate([routeUrl]);
    }

    sendEmailVerification(){
      this.authState.sendEmailVerification().then(()=> {
        console.log("email sent");
      }).catch((error) => {
        console.log(error);
      });
    }
}