import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../core/auth.service";
import { UserService } from "../../../services/user.service";
import { DataService } from "../../../services/data.service";
import { CountryService } from "../../../services/country.service";
import { User } from "../../../models/user";
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

/*
  Component not stable due to email verification
*/

@Component({
  selector: 'newprofile',
  templateUrl: './newprofile.component.html',
  styleUrls: ['./newprofile.component.css']
})
export class NewprofileComponent implements OnInit {

  private user: User;
  private languageList: string[];
  private selectedLanguage: string;
  private nickname: string;
  private name: string;
  private surname: string;
  private isNicknameExisting: boolean = false;
  private isNicknameCorrect: boolean = true;
  private enableButton: boolean = true;
  private nicknameAlert: string;
  private nicknameAlertLength: string;
  private deleteAlert = false;
  private sub: any;
  private isEmailType: boolean = false;
  private isLoading: boolean = true;

  constructor(
    private dataService: DataService,
    private auth: AuthService,
    private userService: UserService,
    private countryService: CountryService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit() {
      this.initNewProfile();
  }

  private initNewProfile() {
    this.sub = this.route.params.subscribe(params => {
      var type = params['type'];
      this.isEmailType = (type != null && type == "email");
      if (this.isEmailType)
        this.sendVerificationEmail();
      if (this.dataService.user == null) {
        this.getUser();
      }
      else {
        this.user = this.dataService.user;
        if (this.user != null && this.user.language != null) {
          this.setUserLanguage();
        }
        else {
          this.selectedLanguage = 'English';
        }
        this.setUserParams();
      }
    });
  }

  private setUserParams() {
    this.nickname = '';
    this.name = '';
    this.surname = '';
    this.languageList = this.countryService.getLanguageNameList();
    this.nicknameAlert = 'Nickname already choosen!', 'error';
    this.nicknameAlertLength = "Nickname lenght must be at least 4", 'error';
    this.isLoading = false;
  }

  private setUserLanguage() {
    if (this.user.systemLanguage != null && this.user.systemLanguage == "Italian")
      this.selectedLanguage = 'Italian';
    else
      this.selectedLanguage = 'English';
  }

  private getUser() {
    this.userService.getUser(this.dataService.getAuthService.currentUserId)
      .subscribe((user) => {
        this.dataService.user = user;
        this.user = user;
        if (this.user != null && this.user.language != null) {
          if (this.user.systemLanguage != null && this.user.systemLanguage == "Italian")
            this.selectedLanguage = 'Italian';
          else
            this.selectedLanguage = 'English';
        }
        else {
          this.selectedLanguage = 'English';
        }
        this.nickname = '';
        this.name = '';
        this.surname = '';
        this.languageList = this.countryService.getLanguageNameList();
        this.nicknameAlert = 'Nickname already choosen!', 'error';
        this.nicknameAlertLength = "Nickname too short", 'error';
        this.isLoading = false;
      });
  }

  private updateUser() {
      if (this.standardFormError()) {
        if (this.isEmailType) {
          this.auth.authState.subscribe((auth) => {
            if (auth.currentUser.emailVerified) {
              this.uploadUser();
            } else {
              this.dataService.openCustomSnackBar("Check your mail client and verify your account", "error");
            }
          });
        } else {
          this.uploadUser();
        }
      }
  }

  private uploadUser() {
      this.deleteAlert = true;
      this.user.isNew = false;
      this.user.language = this.selectedLanguage;
      this.user.nickname = this.nickname;
      this.user.name = this.name;
      this.user.surname = this.surname;

      this.userService.updateUser(this.auth.currentUserId, this.user).then(() => {
        this.dataService.openCustomSnackBar('User edited', 'info');
        this.dataService.navigate("/home/market/market-home");
      }).catch((error) => {
        this.deleteAlert = false;
        this.dataService.openCustomSnackBar('User not edited', 'error');
      });
  }

  onLanguageChanged(language) {
    this.selectedLanguage = language;
  }

  standardFormError(): boolean {
      if (this.name == null || this.name == '') {
        this.dataService.openCustomSnackBar('Name is empty!', 'error');
        return false;
      }
      if (this.surname == null || this.surname == '') {
        this.dataService.openCustomSnackBar('Surname is empty!', 'error');
        return false;
      }
      if (this.selectedLanguage == null || this.selectedLanguage == '') {
        this.dataService.openCustomSnackBar('Language is empty!', 'error');
        return false;
      }

      if (this.nickname == null || this.nickname == '') {
        this.dataService.openCustomSnackBar('Nickname is empty!', 'error');
        return false;
      }
    return true;
  }


  private nicknameNotify(event) {
    this.isNicknameExisting = false;
    this.enableButton = false;
    if (this.nickname != null) {
      this.userService.getUserList({
        orderByChild: 'nickname',
        equalTo: this.nickname.trim(),
        limitTo: 1
      }).subscribe((user) => {
        this.isNicknameExisting = (user != null && user.length == 1);
        this.isNicknameCorrect = (this.nickname.length > 3 || this.nickname.length == 0);
        if (!this.isNicknameExisting)
          this.enableButton = true;
      });
    } else {
      this.enableButton = true;
    }
  }

  private sendVerificationEmail(): void {
    this.auth.sendEmailVerification();
  }

}


