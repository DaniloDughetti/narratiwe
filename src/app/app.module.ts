import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { firebase } from './utils/firebaseconfig';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { FacebookModule } from 'ngx-facebook';

import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

import { DataService } from './services/data.service';
import { UserService } from './services/user.service';
import { CountryService } from './services/country.service';
import { StoryService } from './services/story.service';
import { UploadService } from "./uploads/shared/upload.service";
import { ChapterService } from './services/chapter.service';
import { ChapterCommentService } from './services/chapter-comment.service';
import { StoryCommentService } from './services/story-comment.service';
import { RatingService } from './services/rating.service';
import { UpService } from './services/up.service';

import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WriteComponent } from './components/write/write.component';
import { ReadComponent } from './components/read/read.component';
import { SettingsComponent } from './components/settings/settings.component';
import { EditProfileComponent } from './components/profile/editprofile/editprofile.component';
import { ViewProfileComponent } from './components/profile/viewprofile/viewprofile.component';
import { UploadFormComponent } from './uploads/upload-form/upload-form.component';
import { TOKENS_PROVIDERS } from './services/tokens/countries.tokens';
import { SettingsListComponent } from './components/settings/settings-list/settings-list.component';
import { ConditionsDialogComponent } from './components/dialogs/conditions-dialog/conditions-dialog.component';
import { AboutDialogComponent } from './components/dialogs/about-dialog/about-dialog.component';

import { WriteHomeComponent } from './components/write/write-home/write-home.component';
import { NewstoryStartComponent } from './components/write/newstory/newstory-start/newstory-start.component';
import { NewstoryStartEditComponent } from './components/write/newstory/newstory-start-edit/newstory-start-edit.component';

import { MystoriesListComponent } from './components/write/mystories/mystories-list/mystories-list.component';
import { ProfileHomeComponent } from './components/profile/profile-home/profile-home.component';
import { StoryItemComponent } from './components/shared/story-item/story-item.component';
import { StoryPreviewComponent } from './components/shared/story-preview/story-preview.component';
import { StoryEditPreviewComponent } from './components/shared/story-edit-preview/story-edit-preview.component';
import { StoryDateeditingPipe } from './pipes/story-dateediting.pipe';
import { ChapterListComponent } from './components/shared/chapter-list/chapter-list.component';
import { ChapterItemComponent } from './components/shared/chapter-item/chapter-item.component';
import { ChapterEditComponent } from './components/shared/chapter-edit/chapter-edit.component';

import { Ng2WigModule } from 'ng2wig';
import { ChapterPreviewComponent } from './components/shared/chapter-preview/chapter-preview.component';
import { MarkdownToHtmlModule } from 'ng2-markdown-to-html';
import { ChapterIndexPipe } from './pipes/chapter-index.pipe';
import { ReadHomeComponent } from './components/read/read-home/read-home.component';
import { FavoriteStoriesListComponent } from './components/read/favorite-stories-list/favorite-stories-list.component';
import { ChapterReadComponent } from './components/shared/chapter-read/chapter-read.component';
import { ContinueReadComponent } from './components/read/continue-read/continue-read.component';
import { ReadChronologyComponent } from './components/read/read-chronology/read-chronology.component';
import { StoryItemLightComponent } from './components/shared/story-item-light/story-item-light.component';
import { DeleteDialogComponent } from './components/dialogs/delete-dialog/delete-dialog.component';
import { PublishDialogComponent } from './components/dialogs/publish-dialog/publish-dialog.component';
import { SocialStoryComponent } from './components/shared/social/social-story/social-story.component';
import { SocialChapterComponent } from './components/shared/social/social-chapter/social-chapter.component';
import { SocialRatingItemComponent } from './components/shared/social/social-rating-item/social-rating-item.component';
import { SocialUpItemComponent } from './components/shared/social/social-up-item/social-up-item.component';
import { SocialStoryCommentNewComponent } from './components/shared/social/social-story-comment-new/social-story-comment-new.component';
import { SocialStoryCommentItemComponent } from './components/shared/social/social-story-comment-item/social-story-comment-item.component';
import { SocialChapterCommentNewComponent } from './components/shared/social/social-chapter-comment-new/social-chapter-comment-new.component';
import { SocialChapterCommentItemComponent } from './components/shared/social/social-chapter-comment-item/social-chapter-comment-item.component';
import { StarViewComponent } from './components/shared/social/star-view/star-view.component';
import { SocialStorySummaryComponent } from './components/shared/social/social-story-summary/social-story-summary.component';
import { SocialRatingEditComponent } from './components/shared/social/social-rating-edit/social-rating-edit.component';
import { SocialChapterSummaryComponent } from './components/shared/social/social-chapter-summary/social-chapter-summary.component';
import { MarketComponent } from './components/market/market.component';
import { MarketHomeComponent } from './components/market/market-home/market-home.component';
import { NewstoriesListComponent } from './components/market/newstories-list/newstories-list.component';
import { StoryDatepublishedPipe } from './pipes/story-datepublished.pipe';
import { SearchComponent } from './components/market/search/search.component';
import { SearchResultComponent } from './components/market/search-result/search-result.component';
import { SocialListComponent } from './components/market/social-list/social-list.component';
import { StoryUpsnumberPipe } from './pipes/story-upsnumber.pipe';
import { StoryRatingstotalPipe } from './pipes/story-ratingstotal.pipe';
import { ChangeLanguageDialogComponent } from './components/dialogs/change-language-dialog/change-language-dialog.component';
import { ViewprofileGeneralComponent } from './components/profile/viewprofile-general/viewprofile-general.component';
import { BestUserListComponent } from './components/market/best-user-list/best-user-list.component';
import { UserItemLightComponent } from './components/shared/user-item-light/user-item-light.component';
import { UserRatingPipe } from './pipes/user-rating.pipe';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewprofileComponent } from './components/profile/newprofile/newprofile.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { SocialService } from './services/social.service';
import { AuthorDialogComponent } from './components/dialogs/author-dialog/author-dialog.component';
import { CreateSharedChapterDialogComponent } from './components/dialogs/create-shared-chapter-dialog/create-shared-chapter-dialog.component';
import { SupportDialogComponent } from './components/dialogs/support-dialog/support-dialog.component';
import { ChaptersContributionComponent } from './components/market/chapters-contribution/chapters-contribution.component';
import { ReadBannerComponent } from './components/read/read-banner/read-banner.component';
import { StoryReadComponent } from './components/shared/story-read/story-read.component';
import { StoryReadItemComponent } from './components/shared/story-read-item/story-read-item.component';
import { VerifyemailComponent } from './components/profile/verifyemail/verifyemail.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    NavbarComponent,
    WriteComponent,
    ReadComponent,
    SettingsComponent,
    EditProfileComponent,
    ViewProfileComponent,
    UploadFormComponent,
    SettingsListComponent,
    ConditionsDialogComponent,
    AboutDialogComponent,
    NewstoryStartComponent,
    NewstoryStartEditComponent,
    MystoriesListComponent,
    WriteHomeComponent,
    ProfileHomeComponent,
    StoryItemComponent,
    StoryPreviewComponent,
    StoryEditPreviewComponent,
    StoryDateeditingPipe,
    ChapterListComponent,
    ChapterItemComponent,
    ChapterEditComponent,
    ChapterPreviewComponent,
    ChapterIndexPipe,
    ReadHomeComponent,
    FavoriteStoriesListComponent,
    ChapterReadComponent,
    ContinueReadComponent,
    ReadChronologyComponent,
    StoryItemLightComponent,
    DeleteDialogComponent,
    PublishDialogComponent,
    SocialStoryComponent,
    SocialChapterComponent,
    SocialRatingItemComponent,
    SocialUpItemComponent,
    SocialStoryCommentNewComponent,
    SocialStoryCommentItemComponent,
    SocialChapterCommentNewComponent,
    SocialChapterCommentItemComponent,
    StarViewComponent,
    SocialStorySummaryComponent,
    SocialRatingEditComponent,
    SocialChapterSummaryComponent,
    MarketComponent,
    MarketHomeComponent,
    NewstoriesListComponent,
    StoryDatepublishedPipe,
    SearchComponent,
    SearchResultComponent,
    SocialListComponent,
    StoryUpsnumberPipe,
    StoryRatingstotalPipe,
    ChangeLanguageDialogComponent,
    ViewprofileGeneralComponent,
    BestUserListComponent,
    UserItemLightComponent,
    UserRatingPipe,
    NotFoundComponent,
    NewprofileComponent,
    CapitalizePipe,
    AuthorDialogComponent,
    CreateSharedChapterDialogComponent,
    SupportDialogComponent,
    ChaptersContributionComponent,
    ReadBannerComponent,
    StoryReadComponent,
    StoryReadItemComponent,
    VerifyemailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule, 
    firebase,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CoreModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatSlideToggleModule,
    Ng2WigModule,
    MatMenuModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '4px',
      primaryColour: 'rgba( 59,122,149, 1)', 
      secondaryColour: 'rgba( 59,122,149, 1)', 
      tertiaryColour: 'rgba( 59,122,149, 1)'
  }),
    MarkdownToHtmlModule.forRoot(),
    MatInputModule,
    FacebookModule.forRoot()
  ],
  providers: [
    UserService,
    UploadService,
    DataService,
    CountryService,
    CountryService,
    StoryService,
    ChapterService,
    StoryCommentService,
    RatingService,
    UpService,
    ChapterCommentService,
    SocialService,
    TOKENS_PROVIDERS,
    { provide: LOCALE_ID, useValue: 'it' }
  ],
  entryComponents: [
    ConditionsDialogComponent,
    AboutDialogComponent,
    DeleteDialogComponent,
    PublishDialogComponent,
    ChangeLanguageDialogComponent,
    AuthorDialogComponent,
    CreateSharedChapterDialogComponent,
    SupportDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
