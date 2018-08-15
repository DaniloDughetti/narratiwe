import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from "../../core/auth.service";
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  
  private displayDialog = false;
  private isDescriptionVisible = false;

  constructor(private auth: AuthService) {
  }
  
  ngOnInit(): void {
    if(!this.isUserLogged()){
      this.auth.navigate("/home");
    }
  }

  private isUserLogged() {
    return this.auth.currentUser;
  }

  openModal(ev){
    this.displayDialog = !this.displayDialog;
  }
  
  scroll(el) {
    this.isDescriptionVisible = !this.isDescriptionVisible;
    el.scrollIntoView();
  }

}
