import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectOwnerComponent } from './project-owner/project-owner.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { PipelineTestsComponent } from './pipeline-tests/pipeline-tests.component';
import { AuthorsCardComponent } from './authors-card/authors-card.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ArchigatorApiService} from "./archigator-api.service";
import {AuthInterceptorService} from "./services/api-interceptor.service";
import { SuccessComponent } from './success/success.component';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';



import { OAuthService  } from "angular-oauth2-oidc";


import '@nfdi4plants/web-components';
import { OrderComponent } from './order/order.component';
import {OAuthModule} from "angular-oauth2-oidc";
import { AuthTestComponent } from './auth-test/auth-test.component';
import {authConfig} from "../environments/auth.config";
import {ApiQueueService} from "./services/apiqueue.service";
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { AuthorsComponent } from './authors/authors.component';
import { InvestigationInfoComponent } from './investigation-info/investigation-info.component';
import {FormsModule} from "@angular/forms";
import { IntroComponent } from './intro/intro.component';


export function appInitializerFactory(oauthService: OAuthService) {
  return () => oauthService.configure(authConfig);
}


const routes: Routes = [
  { path: 'success', component: SuccessComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    ProjectOwnerComponent,
    CheckoutComponent,
    PipelineTestsComponent,
    AuthorsCardComponent,
    SuccessComponent,
    MainComponent,
    OrderComponent,
    AuthTestComponent,
    LoginComponent,
    HeaderComponent,
    AuthorsComponent,
    InvestigationInfoComponent,
    IntroComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    RouterModule,
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: true
      }
    }),
  ],
  // providers: [ArchigatorApiService,
  //   {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true}],

  providers: [OAuthService,
    // ApiQueueService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true},
// {
//   provide: APP_INITIALIZER,
//   useFactory: appInitializerFactory,
//   deps: [OAuthService],
//   multi: true
// }
],


  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
