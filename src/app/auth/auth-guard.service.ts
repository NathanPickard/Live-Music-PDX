import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard  {

  constructor(private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isAuthenticated();
  }
}