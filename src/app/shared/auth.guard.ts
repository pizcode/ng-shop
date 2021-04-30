import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, Router } from '@angular/router';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private US: UserService, private routes: Router) { }

  canActivate(): boolean {
    if (this.US.isLoggedIn()) {
      return true;
    }
    this.routes.navigate(['/login']);
    return false;
  }

}
