import { NgModule } from '@angular/core';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  providers: [
    AuthService,
    AuthGuard
  ],
  imports: [AngularFireAuthModule]
})
export class CoreModule { }
