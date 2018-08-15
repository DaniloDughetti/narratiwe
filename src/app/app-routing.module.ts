import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth.guard';
import { CoreModule } from './core/core.module'

import { WelcomeComponent } from './components/welcome/welcome.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { WriteComponent } from './components/write/write.component';
import { ReadComponent } from './components/read/read.component';
import { MarketComponent } from './components/market/market.component';
import { MarketHomeComponent } from './components/market/market-home/market-home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ViewProfileComponent } from './components/profile/viewprofile/viewprofile.component';
import { EditProfileComponent } from './components/profile/editprofile/editprofile.component';
import { NewstoryStartComponent } from './components/write/newstory/newstory-start/newstory-start.component';
import { NewstoryStartEditComponent } from './components/write/newstory/newstory-start-edit/newstory-start-edit.component';
import { WriteHomeComponent } from './components/write/write-home/write-home.component';
import { ProfileHomeComponent } from './components/profile/profile-home/profile-home.component';
import { StoryPreviewComponent } from './components/shared/story-preview/story-preview.component';
import { StoryEditPreviewComponent } from './components/shared/story-edit-preview/story-edit-preview.component';
import { ChapterEditComponent } from './components/shared/chapter-edit/chapter-edit.component';
import { ChapterPreviewComponent } from './components/shared/chapter-preview/chapter-preview.component';
import { ReadHomeComponent } from './components/read/read-home/read-home.component';
import { ChapterReadComponent } from './components/shared/chapter-read/chapter-read.component';
import { SearchResultComponent } from './components/market/search-result/search-result.component';
import { ViewprofileGeneralComponent } from './components/profile/viewprofile-general/viewprofile-general.component';
import { NotFoundComponent} from './not-found/not-found.component';
import { NewprofileComponent } from './components/profile/newprofile/newprofile.component';
import { StoryReadComponent } from './components/shared/story-read/story-read.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'new-profile/:type', component: NewprofileComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard],
  children: [
    { path: 'profile', component: ProfileComponent, children:[
      { path: 'profile-home', component: ProfileHomeComponent },
      { path: 'view', component: ViewProfileComponent },
      { path: 'edit', component: EditProfileComponent },
      { path: 'view-general/:id', component: ViewprofileGeneralComponent }
    ]},
    { path: 'write', component: WriteComponent, children:[
        { path: 'write-home', component: WriteHomeComponent },
        { path: 'newstory-start-edit/:type', component: NewstoryStartEditComponent },
    ]},
    { path: 'read', component: ReadComponent, children: [
      { path: 'read-home', component: ReadHomeComponent }
    ] },
    { path: 'market', component: MarketComponent, children: [
      { path: 'market-home', component: MarketHomeComponent },
      { path: 'search-result', component: SearchResultComponent }
    ] },
    { path: 'settings', component: SettingsComponent },
    { path: 'story-preview/:id', component: StoryPreviewComponent },
    { path: 'story-read/:id', component: StoryReadComponent },
    { path: 'story-edit-preview', component: StoryEditPreviewComponent },
    { path: 'chapter-edit', component: ChapterEditComponent },
    { path: 'chapter-preview/:id', component: ChapterPreviewComponent },
    { path: 'chapter-read', component: ChapterReadComponent }
  ]
  },
  {path: '404', component: NotFoundComponent},
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
