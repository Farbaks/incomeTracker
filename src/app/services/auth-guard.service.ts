import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private usersService: UsersService,
    public globalService: GlobalService,) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // throw new Error('Method not implemented.');

    try {
      if(!localStorage.getItem('token')) {
        this.router.navigate(['/signin'], { replaceUrl: true });
        return false;
      }
      this.usersService.checkToken().subscribe(
        (data) => {
          return true;
        },
        (error) => {
          this.globalService.showToast("Session expired.", 2000, "error");
          this.router.navigate(['/signin'], { replaceUrl: true })
          return false;
        }
      );

      return true;

    }
    catch (error) {
      console.log("an error");
      this.router.navigate(['/signin'], { replaceUrl: true })
      return false
    }
  }
}
