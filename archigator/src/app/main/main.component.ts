import {Component, OnInit} from '@angular/core';
import {AuthConfig, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {authConfig} from "../../environments/auth.config";
import {filter} from "rxjs";
import {ParametersService} from "../services/parameters.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import {ApiQueueService} from "../services/apiqueue.service";
import {ApiService} from "../services/api.service";
import {Metadata} from "../shared/response";


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})


export class MainComponent implements OnInit{

    hasMetadata: boolean = false;

    constructor(private oauthService: OAuthService,
                private parameterService: ParametersService,
                private route: ActivatedRoute,
                private router: Router,
                private apiQueue: ApiQueueService,
                private apiService: ApiService)
    {
    }


    ngOnInit() {

      console.log("in init main")

      // if (!this.oauthService.hasValidAccessToken()) {
      //   this.login();
      //   console.log("ste", this.oauthService.state)
      // }

        const publicationToken = this.getTokenFromURL()
        this.parameterService.setPublication(publicationToken)


        const queryParams = this.route.snapshot.queryParams;
        const tokenValue = queryParams["publication"];

        console.log("saving pub token")
        if (tokenValue) {
            sessionStorage.setItem("publication", tokenValue);
        }


        if (sessionStorage.getItem("publication") === null){
            console.log("route to frontpage")
            this.router.navigate(["/welcome"])
        }

        this.loadMetadata();


    }


    loadMetadata() {
        this.apiService.getMetadata().subscribe(
            (metadata: Metadata) => {
                if (metadata) {
                    // Handle the logic here if metadata is not null or undefined
                    this.hasMetadata = true;
                }
            },
            (error) => {
                console.error('Failed to load metadata:', error);
                this.hasMetadata = false;
            }
        );
    }


    async login(){

      // const queryParams = this.route.snapshot.queryParams;
      // const tokenValue = queryParams["publication"];

      // this.oauthService.initLoginFlow(this.router.url);
        this.oauthService.initLoginFlow()


    }


    async login2() {

        const queryParams = this.route.snapshot.queryParams;
        this.parameterService.setParams(queryParams);
        console.log("storing parameters", queryParams)
        console.log("")


        console.log("login to keylcoak")
        console.log(authConfig.issuer)
        console.log(authConfig.scope)
        this.oauthService.configure(authConfig);
        // this.oauthService.loadDiscoveryDocumentAndLogin();
        // this.oauthService.loadDiscoveryDocument();


        console.log("loginurl", this.oauthService.loginUrl);



        // this.oauthService.loadDiscoveryDocument();

        // this.oauthService.initLoginFlow("optional", {params: queryParams.toString()});

        this.oauthService.configure(authConfig);




        await this.oauthService.loadDiscoveryDocument()
        await this.oauthService.tryLogin()

        if (!this.oauthService.hasValidAccessToken()) {
            this.oauthService.initLoginFlow();
            console.log("ste", this.oauthService.state)
        }








        // this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
        //
        //
        //     this.oauthService.tryLogin({
        //
        //         onTokenReceived: (info) => {
        //             console.log("token state is", info.state, info)
        //         }
        //     })
        //
        //
        //     if (!this.oauthService.hasValidAccessToken()) {
        //
        //         const loginHint = 'example@example.com';
        //         const extraParams = { customParam: 'customValue' };
        //
        //         console.log(this.oauthService.createAndSaveNonce().then(console.log))
        //
        //         // this.oauthService.initLoginFlow({par: "bla"});
        //         this.oauthService.initLoginFlow(loginHint, extraParams);
        //
        //
        //
        //         // this.oauthService.initLoginFlow()
        //
        //     }
        // });



        this.oauthService.events
            .pipe(filter((e) => e.type === 'token_received'))
            .subscribe((_) => this.oauthService.loadUserProfile());

        // this.oauthService.initCodeFlow();
        // this.oauthService.initCodeFlow();
    }


    accessToken(): string {
        console.log(this.oauthService.getAccessToken());
        return this.oauthService.getAccessToken();
    }

    getParams() {
        const params = this.parameterService.getParams()
        console.log("paramters", params)
    }



    private getTokenFromURL(): String | null {
        const urlSearchParams = new URLSearchParams(window.location.search);
        console.log("token is", urlSearchParams.get("token"));


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
