import {Component, OnInit} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {ParametersService} from "../services/parameters.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiQueueService} from "../services/apiqueue.service";
import {Metadata, Test} from "../shared/response";
import {ApiService} from "../services/api.service";
import {faSpinner} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-investigation-info',
  templateUrl: './investigation-info.component.html',
  styleUrls: ['./investigation-info.component.css']
})
export class InvestigationInfoComponent implements OnInit{

  metadata ?: Metadata;
  loading = true;
  error = false;

  faSpinner = faSpinner;



  constructor(private apiservice: ApiService)
  {}


  ngOnInit() {

    // // @ts-ignore
    // this.apiservice.getMetadata().subscribe((data: Metadata) => {
    //     console.log("data", data)
    //     this.metadata = data;
    //     this.loading = false;
    //
    //     if (data === null) {
    //       console.log("data are null")
    //       this.error = true;
    //     }
    //
    //   },
    //
    //   (error) => {
    //     this.loading = false;
    //     console.log("error occurred")
    //     this.error = true;
    //   });


    this.apiservice.getMetadata().subscribe(
      {next: (data: Metadata) => {
          this.metadata = data;
          this.loading = false;
          console.log("loading ended");
          // if (results.length == 0){
          //   this.error = true;
          // }
        },
        error: (error: any) => {
          console.error(error);
          this.loading=false;
          this.error = true;
        }

      }
    );

  }


}
