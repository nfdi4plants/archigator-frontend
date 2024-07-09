// Examples: https://github.com/bezkoder/angular-15-refresh-token
// https://www.techiediaries.com/send-authorization-header-angular-14/
// https://www.techiediaries.com/send-authorization-header-angular-14/
// https://indepth.dev/tutorials/angular/authentication-token-interceptor

import {Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import {Observable} from "rxjs";
import {Response} from "../shared/response";
import {ActivatedRoute, Router} from "@angular/router";
import {ParametersService} from "./parameters.service";
import {OAuthEvent, OAuthService} from "angular-oauth2-oidc";
import {ApiQueueService} from "./apiqueue.service";

import { environment } from '../../environments/environment';

// import * as url from "url";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  token ?: string | null;
  publication_token ?: string | null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private parameterService: ParametersService,
              private oauthService: OAuthService,
              private apiQueue: ApiQueueService) {
  }

  // @ts-ignore
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("in interceptor");

    // const token = this.authService.getAuthToken();

    // this.route.queryParamMap.subscribe(queryParams => {
    //   this.token = queryParams.get('token');
    //   console.log("token is is", this.token)
    //
    // });

    // const token = this.getTokenFromURL();

    // const token = this.parameterService.getPublication()

    const token = this.oauthService.getAccessToken();
    // const token = this.publication_token;
    const publicationToken = this.publication_token;


    this.parameterService.publicationToken$.subscribe((data: string) => {
      this.token = data;
      this.publication_token = data;
    });

    console.log("got token as", token)


    // if (token) {
    //   // If we have a token, we set it to the header
    //   const authRequest = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${token}`,
    //       // Authorization: this.oauthService.authorizationHeader(),
    //       // Publication: `token ${publicationToken}`,
    //     },
    //   });
    //   console.log("request", authRequest)
    //   return next.handle(authRequest);
    //
    // }
    //
    // // return next.handle(request);
    //
    // else {
    //   console.log("token not valid");
    //   // this.router.navigate(["/error"]);
    // }
    // return next.handle(request);

    // return next.handle(request).pipe(
    //   catchError((err) => {
    //     if (err instanceof HttpErrorResponse) {
    //       if (err.status === 401) {
    //         // redirect user to the logout page
    //       }
    //     }
    //     return throwError(err);
    //   })
    // )

    // Subscribe to OAuth events to handle authentication changes
    // this.oauthService.events.subscribe((event: OAuthEvent) => {
    //   if (event.type === 'token_received') {
    //     this.apiQueue.processQueue();
    //   }
    // });


    // Check if the request is a login request
    if (request.url.includes(environment.issuer_domain)) {
      return next.handle(request);
    }


    if (request.url.includes('/order')) {
      return next.handle(request);
    }

    // if (this.oauthService.hasValidAccessToken()) {
    //   // Get the access token
    //   const accessToken = this.oauthService.getAccessToken();
    //
    //   // Clone the original request and add the authorization and custom headers
    //   const modifiedRequest = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${accessToken}`,
    //       Publication: 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0X25hbWUiOiJJbnZlbmlvVGVzdGluZyIsInByb2plY3RfaWQiOjc0fQ.41e8BF7XWDHxHxfuvt5NEHVe3NkqOVEBRSOX_7jI_yg'
    //     }
    //   });
    //
    //   // Pass the modified request to the next handler
    //   return next.handle(modifiedRequest);
    // }
    //
    // else {
    //   console.log("no access token, request will be enqueued")
    //   console.log(request)
    //   this.apiQueue.enqueue(()=>next.handle(request))
    //
    // }


    if (this.oauthService.hasValidAccessToken()) {
      console.log("token available, so adding token to header")
      // Get the access token
      const accessToken = this.oauthService.getAccessToken();

      // Clone the original request and add the authorization header
      const modifiedRequest = request.clone({
        setHeaders: {
                Authorization: `Bearer ${accessToken}`,
                Publication: 'Token ' + sessionStorage.getItem("publication")
              }
      });

      console.log("have tolkin modified req")
      // Pass the modified request to the next handler
      return next.handle(modifiedRequest);
    }
    else {
      return next.handle(request);
    }

    // else {
    //   console.log("no token so enquee", request)
    //   // debugger
    //   // Enqueue the request if the user is not authenticated yet
    //
    //   this.apiQueue.enqueue(() => next.handle(request), request)
    //   return new Observable<HttpEvent<any>>();
    //   // return new Observable((observer) => {
    //   //
    //   // });
    // }



    // If not authenticated, continue with the original request
    // return next.handle(request);


  }



  private getTokenFromURL(): String | null {
    const urlSearchParams = new URLSearchParams(window.location.search);
    console.log("token is", urlSearchParams.get("token"));
    console.log("token2 is", urlSearchParams.get("token2"));


    const queryParams = this.route.snapshot.queryParams;
    const tokenValue = queryParams["token"];

    console.log("tokenValue", tokenValue);


    let tokenValue2 = "";

    this.route.queryParams.subscribe(params => {
      // Process the query parameters here
      console.log("subsparams", params);

      tokenValue2 = params["publication"];

    });

    return tokenValue2

    // return urlSearchParams.get("token");
  }

}
