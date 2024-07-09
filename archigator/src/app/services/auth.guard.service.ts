import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {AuthService} from "./auth.service";
import {OAuthService} from "angular-oauth2-oidc";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private oauthService: OAuthService, private router: Router,
              private authService: AuthService,
              private route: ActivatedRoute)
  { console.log("auth guard initialized")}


  canActivate(aroute: ActivatedRouteSnapshot,
              routerState: RouterStateSnapshot): boolean | UrlTree {

    const publication_token = aroute.queryParams["publication"];

    if (publication_token) {
      sessionStorage.setItem("publication", publication_token);
    }


    const usePreviousDataParam = 'publication';
    const usePreviousData = aroute.queryParamMap.has(usePreviousDataParam);


    const queryParams = this.route.snapshot.queryParams;
    const tokenValue = queryParams["publication"];

    if (tokenValue) {
      sessionStorage.setItem("publication", tokenValue);
    }

    if (this.authService.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }


}
