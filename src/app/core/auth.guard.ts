import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
//import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from "./auth.service";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      if (this.auth.authenticated) { 
        return true; 
      }
      return this.auth.currentUserObservable
           .take(1)
           .map(user => !!user)
           .do(loggedIn => {
             if (!loggedIn) {
               this.router.navigate(['/']);
             }
         })
  }

}