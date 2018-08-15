import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../core/auth.service";
import { UserService } from "../../../services/user.service";
import { DataService } from "../../../services/data.service";
import { CountryService } from "../../../services/country.service";
import { User } from "../../../models/user";
import { Address } from "../../../models/address";
import { Upload } from "../../../uploads/shared/upload";
import { UploadFormComponent } from '../../../uploads/upload-form/upload-form.component';
import { Location } from '@angular/common';
import { UploadService } from '../../../uploads/shared/upload.service';

@Component({
  selector: 'editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditProfileComponent implements OnInit {

  private user: User;
  private address: Address;
  private isEdited: boolean = false;
  private isNicknameEdited: boolean = false;
  private tempNickname: string;
  private isNicknameExisting: boolean = false;
  private isNicknameCorrect: boolean = true;
  private enableButton: boolean = true;
  private nicknameAlert: string;
  private nicknameAlertLength: string;
  private deleteAlert = false;
  private countriesList: string[];
  private selectedCountry: string;
  private languageList: string[];
  private selectedLanguage: string;
  private currentUpload: Upload;

  constructor(
    private dataService: DataService,
    private auth: AuthService,
    private userService: UserService,
    private countryService: CountryService,
    private location: Location,
    private uploadService: UploadService) { }

  ngOnInit() {
    this.initEditProfile();
  }

  private initEditProfile() {
    try {
      this.user = this.dataService.user;
      this.setUserNickname();
      this.setUserLanguage();
      this.setUserAddress();
      this.initLanguage();
    }
    catch (e) {
      this.dataService.manageError(e.message, "editprofile.component");
    }
  }

  private initLanguage() {
    this.countriesList = this.countryService.getCountriesNameList();
    this.selectedCountry = this.selectedCountry;
    this.languageList = this.countryService.getLanguageNameList();
    this.selectedLanguage = this.selectedLanguage;
    this.nicknameAlert = 'Nickname already choosen!', 'error';
    this.nicknameAlertLength = "Nickname lenght must be at least 4", 'error';
  }

  private setUserAddress() {
    if (this.user.address == null) {
      this.address = {
        address: '',
        city: '',
        state: '',
        postalCode: 0
      };
      this.selectedCountry = '';
    }
    else {
      this.address = this.user.address;
      this.selectedCountry = this.address.state;
    }
  }

  private setUserNickname() {
    if (this.user.nickname != null)
      this.tempNickname = this.user.nickname;
  }

  private setUserLanguage() {
    if (this.user.language == null) {
      this.selectedLanguage = '';
    }
    else {
      this.selectedLanguage = this.user.language;
    }
  }

  private updateUser() {
    try {
      if (this.isEdited) {
        if (this.standardFormError()) {
          this.uploadUser();
          this.dataService.navigate("/home/profile/profile-home");
        }
      } else {
        this.dataService.openCustomSnackBar('User not edited', 'error');
        this.dataService.navigate("/home/profile/profile-home");
      }
    } catch (e) {
      this.dataService.manageError(e.message, "editprofile.component");
    }
  }

  uploadUser() {
    try {
      this.deleteAlert = true;
      this.address.state = this.selectedCountry;
      this.user.language = this.selectedLanguage;
      this.user.address = this.address;
      this.updateNewUser();
    } catch (e) {
      this.dataService.manageError(e.message, "editprofile.component");
    }
  }

  private updateNewUser() {
    this.userService.updateUser(this.auth.currentUserId, this.user).then(() => {
      this.getUserImage();
      ;
    }).catch((error) => {
    });
  }

  private getUserImage() {
    this.uploadService.getUserProfileImageUrl(this.user.$key).getDownloadURL()
      .then(url => {
        this.dataService.setPwUserImage(url);
        this.dataService.openCustomSnackBar('User edited', 'info');
        this.dataService.navigate("/home/profile/profile-home");
      }).catch((error) => {
        this.deleteAlert = false;
        this.isEdited = false;
        this.dataService.navigate("/home/profile/profile-home");
      });
  }

  private formNotify(event) {
    this.isEdited = true;
  }

  private nicknameNotify(event) {
    this.isNicknameExisting = false;
    this.enableButton = false;
    if (this.user.nickname != this.tempNickname) {
      this.isEdited = true;
      this.isNicknameEdited = true;
      this.getUserList();
    } else {
      this.isEdited = false;
      this.isNicknameEdited = false;
      this.enableButton = true;
    }
  }

  private getUserList() {
    this.userService.getUserList({
      orderByChild: 'nickname',
      equalTo: this.user.nickname.trim(),
      limitTo: 1
    }).subscribe((user) => {
      this.isNicknameExisting = (user != null && user.length == 1);
      this.isNicknameCorrect = this.user.nickname != null && (this.user.nickname.length > 3 || this.user.nickname.length == 0);
      if (!this.isNicknameExisting)
        this.enableButton = true;
    });
  }

  private onCountryChanged(country) {
    this.isEdited = true;
    this.selectedCountry = country;
  }

  private onLanguageChanged(language) {
    this.isEdited = true;
    this.selectedLanguage = language;
  }

  private standardFormError(): boolean {
      if (this.isUploadNotFinished()) {
        this.dataService.openCustomSnackBar('Wait the image upload end!', 'error');
        return false;
      }
      if (this.isUserNameEmpty()) {
        this.dataService.openCustomSnackBar('Name is empty!', 'error');
        return false;
      }
      if (this.isUserSurnameEmpty()) {
        this.dataService.openCustomSnackBar('Surname is empty!', 'error');
        return false;
      }
      if (this.isLanguageNull()) {
        this.dataService.openCustomSnackBar('Language is empty!', 'error');
        return false;
      }
      if (this.isBirthdayNull()) {
        this.dataService.openCustomSnackBar('Birthday is empty!', 'error');
        return false;
      }
      if (this.isUserNicknameNull()) {
        this.dataService.openCustomSnackBar('Nickname is empty!', 'error');
        return false;
      }
    return true;
  }

  private isUserNicknameNull() {
    return this.user.nickname == null || this.user.nickname.trim() == '';
  }

  private isBirthdayNull() {
    return this.user.birthday == null;
  }

  private isLanguageNull() {
    return this.selectedLanguage.trim() == '';
  }

  private isUserSurnameEmpty() {
    return this.user.surname == null || this.user.surname.trim() == '';
  }

  private isUserNameEmpty() {
    return this.user.name == null || this.user.name.trim() == '';
  }

  private isUploadNotFinished() {
    return this.currentUpload != null && this.currentUpload.progress < 100;
  }

  private backClicked() {
    this.location.back();
  }

  private uploadDone(ev) {
    this.currentUpload = ev;
  }
}
