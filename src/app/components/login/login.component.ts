import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from "../../core/auth.service";
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { UserService } from '../../services/user.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private userForm: FormGroup;
  private newUser = false;
  private passReset = false;
  private buttonLogInLoading: boolean = false;
  private buttonSignInLoading: boolean = false;
  private loginError: string = null;
  @Output()
  private displayDialog = new EventEmitter();

  formErrors = {
    'email': '',
    'password': ''
  };
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be a valid email',
      'invalid-email': 'The email address is badly formatted.'
    },
    'password': {
      'required': 'Password is required.',
      'pattern': 'Password must be include at one letter and one number.',
      'minlength': 'Password must be at least 4 characters long.',
      'maxlength': 'Password cannot be more than 40 characters long.',
    }
  };

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private userService: UserService,
    private dataService: DataService) { }

  public ngOnInit(): void {
    this.buildForm();
    var userLang = navigator.language;
  }

  public toggleForm() {
    this.newUser = !this.newUser;
    this.loginError = null;
  }

  public signIn(): void {
    this.buttonSignInLoading = true;
    this.auth.emailSignIn(this.userForm.value['email'], this.userForm.value['password'])
      .then(() => {
        this.buttonSignInLoading = false;
        this.dataService.navigateWithParameter("/new-profile", "email");
      })
      .catch((error) => {
        this.loginError = this.convertLogInErrorMessage(error['code']);
        this.buttonSignInLoading = false;
      });
  }

  public login(): void {
    this.buttonLogInLoading = true;
    this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password'])
      .then(() => {
        this.buttonLogInLoading = false;
        this.auth.navigate("/home/market/market-home");
      })
      .catch((error) => {
        this.loginError = this.convertLogInErrorMessage(error['code']);
        this.buttonLogInLoading = false;
      });
  }

  public resetPassword() {
    this.auth.resetPassword(this.userForm.value['email'])
      .then(() => this.passReset = true)
  }

  public showDialog() {
    this.displayDialog.emit("Cliccato sulle condizioni");
  }

  public buildForm(): void {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
      ],
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  public onValueChanged(data?: any) {
    this.loginError = null;
    if (!this.userForm) { return; }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  public convertLogInErrorMessage(code: string): string {
    switch (code) {
      case 'auth/user-disabled': {
        return 'Sorry your user is disabled.';
      }
      case 'auth/user-not-found': {
        return 'Sorry user not found.';
      }
      case 'auth/invalid-email': {
        return 'Invalid email';
      }
      case 'auth/wrong-password': {
        return 'Wrong password';
      }
      case 'auth/weak-password': {
        return 'Password too weak';
      }
      default: {
        return 'Login error try again later.';
      }
    }
  }

  public facebookLogin() {
    this.auth.facebookLogin()
      .then(() => {
        this.userService.getUser(this.auth.currentUserId)
          .subscribe((user) => {
            if (user == null || user.isNew) {
              this.auth.updateUserData();
              this.dataService.navigateWithParameter("/new-profile", "social");
            } else {
              this.auth.navigate("/home/market/market-home");
            }
          });
      })
      .catch((error) => {
        this.loginError = this.convertLogInErrorMessage(error['code']);
        this.buttonLogInLoading = false;
      });
  }

  public googleLogin() {
    this.auth.googleLogin()
      .then(() => {
        this.userService.getUser(this.auth.currentUserId)
          .subscribe((user) => {
            if (user == null || user.isNew) {
              this.auth.updateUserData();
              this.dataService.navigateWithParameter("/new-profile", "social");
            } else {
              this.auth.navigate("/home/market/market-home");
            }
          });
      })
      .catch((error) => {
        this.loginError = this.convertLogInErrorMessage(error['code']);
        this.buttonLogInLoading = false;
      });
  }

}
