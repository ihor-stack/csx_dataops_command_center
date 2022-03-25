/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot
} from '@angular/router';
import { UserService } from '@services/user.service';
import { RoutePaths, UnauthorizedRoutePaths } from '@defs/route-paths';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userService.isLogged()) return true;

    this.router.navigate([RoutePaths.Unauthorized, UnauthorizedRoutePaths.Login]);
    return false;
  }
}
