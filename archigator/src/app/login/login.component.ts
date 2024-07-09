import {Component, OnInit} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {authConfig} from "../../environments/auth.config";
import {filter, first} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  isLoggedIn = false;

  constructor(private oauthService: OAuthService,
              private router: Router,
              private authService: AuthService,
              private route: ActivatedRoute) {

    this.oauthService.configure(authConfig);
  }

  ngOnInit() {


    const queryParams = this.route.snapshot.queryParams;
    const tokenValue = queryParams["publication"];
    console.log("tokenValue", tokenValue);

    if (tokenValue) {
      sessionStorage.setItem("publication", tokenValue);
    }







    // this.login()
    this.isLoggedIn = this.authService.isLoggedIn;

    if (this.oauthService.hasValidAccessToken()) {
      console.log("successfully authenticated, auth is now complete. releasing queue")
      console.log("access key is", this.oauthService.getAccessToken())
      // this.apiQueue.authenticationCompleted();
      this.router.navigate(["/main"]);
    }

  }

  login(): void {
    this.authService.login();
    this.router.navigate(['/main']);
  }

  logout(): void {
    this.authService.logout();
  }


  accessToken(): string {
    console.log(this.oauthService.getAccessToken());
    return this.oauthService.getAccessToken();
  }


}
