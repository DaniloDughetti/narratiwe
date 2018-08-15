import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SettingsListComponent } from "../../settings/settings-list/settings-list.component";
import { CountryService } from '../../../services/country.service';
import { UserService } from '../../../services/user.service';
import { DataService } from '../../../services/data.service';


@Component({
  selector: 'change-language-dialog',
  templateUrl: './change-language-dialog.component.html',
  styleUrls: ['./change-language-dialog.component.css']
})
export class ChangeLanguageDialogComponent implements OnInit {

  public storyLanguageList: string[];
  public systemLanguageList: string[];
  public selectedStoryLanguage: string;
  public selectedSystemLanguage: string;
  public isStoryEdited: boolean = false;
  public isSystemEdited: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<SettingsListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private countryService: CountryService,
    private userService: UserService,
    private dataService: DataService) { }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public ngOnInit() {
    try {
      this.initLanguageSettings();
    } catch (e) {
      this.dataService.manageError(e.message, "change-language-dialog");
    }
  }

  private initLanguageSettings() {
    this.storyLanguageList = this.countryService.getLanguageNameList();
    this.systemLanguageList = this.countryService.getSupportedSystemLanguage();

    this.selectedStoryLanguage = this.data.user.storyLanguage;
    this.selectedSystemLanguage = this.data.user.systemLanguage;
  }

  private onStoryLanguageChanged(language) {
    this.isStoryEdited = true;
    this.selectedStoryLanguage = language;
  }

  private onSystemLanguageChanged(language) {
    this.isSystemEdited = true;
    this.selectedSystemLanguage = language;
  }

  private changeLanguage() {
    try {
      if (this.isStoryAndSystemEdited()) {
        this.setDefaultLanguage();
        this.updateUserLanguage();
      }
    } catch (e) {
      this.dataService.manageError(e.message, "change-language-dialog.component");
    }
  }


  private isStoryAndSystemEdited(): boolean {
    return this.isStoryEdited || this.isSystemEdited;
  }

  private setDefaultLanguage() {
    if (this.isStoryEdited) {
      this.data.user.storyLanguage = this.selectedStoryLanguage;
    }
    if (this.isSystemEdited) {
      this.data.user.systemLanguage = this.selectedSystemLanguage;
    }
  }

  private updateUserLanguage() {
    this.userService.updateUser(this.data.user.$key, this.data.user)
      .then(() => {
        this.dataService.openCustomSnackBar('Language updated', 'info');
      })
      .catch((error) => {
        this.dataService.openCustomSnackBar('Language not updated', 'error');
      })
  }
}
