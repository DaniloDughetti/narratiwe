import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../services/data.service";
import { UserService } from "../../../services/user.service";
import { AuthService } from "../../../core/auth.service";
import { User } from "../../../models/user";
import { ConditionsDialogComponent } from "../../dialogs/conditions-dialog/conditions-dialog.component";
import { AboutDialogComponent } from "../../dialogs/about-dialog/about-dialog.component";
import { AuthorDialogComponent } from "../../dialogs/author-dialog/author-dialog.component";
import { ChangeLanguageDialogComponent } from "../../dialogs/change-language-dialog/change-language-dialog.component";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SupportDialogComponent } from '../../dialogs/support-dialog/support-dialog.component';

@Component({
  selector: 'settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.css']
})
export class SettingsListComponent implements OnInit {

  private user: User;
  private showNickname: boolean = false;

  constructor(private dataService: DataService,
    private authService: AuthService,
    private userService: UserService,
    public dialog: MatDialog) { }


  ngOnInit() {
    this.user = this.dataService.user;
    this.showNickname = this.user.showNickname;
  }

  private logOut() {
    this.dataService.resetPwVariables();
    this.dataService.resetEnvironmentVariables();
    localStorage.clear();
    this.authService.signOut();
  }

  private openConditionsDialog() {
    let dialogRef = this.dialog.open(ConditionsDialogComponent, {
      width: '60%'
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  private openAboutDialog() {
    let dialogRef = this.dialog.open(AboutDialogComponent, {
      width: '60%'
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  private openAuthorDialog() {
    let dialogRef = this.dialog.open(AuthorDialogComponent, {
      width: '60%'
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  private openSupportDialog() {
    let dialogRef = this.dialog.open(SupportDialogComponent, {
      width: '60%'
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  private changeLanguage() {
    let dialogRef = this.dialog.open(ChangeLanguageDialogComponent, {
      width: '60%',
      data: { user: this.user }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  private changeNicknameSetting() {
    try {
      this.user.showNickname = !this.user.showNickname;
      this.updateUser();
    } catch (e) {
      this.dataService.manageError(e.message, "setting-list.component");
    }
  }


  private updateUser() {
    this.userService.updateUser(this.user.$key, this.user)
      .then(() => {
        this.showNickname = !this.showNickname;
        if (this.showNickname) {
          this.dataService.openCustomSnackBar("Now other user will see only your nickname", "error");
        }
        else {
          this.dataService.openCustomSnackBar("Now other user will see only your name and surname", "error");
        }
      })
      .catch(() => {
        this.dataService.openCustomSnackBar("Nickname setting not changed", "error");
      });
  }
}
