import {Component, OnInit} from '@angular/core';
import {ArchigatorApiService} from "../archigator-api.service";
import {ApiService} from "../services/api.service";
import {ActivatedRoute} from "@angular/router";
import {Metadata, Pipeline, Test} from "../shared/response";
import {Observable} from "rxjs";
import {faEnvelope, faUser, faSpinner, faImage } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-pipeline-tests',
  templateUrl: './pipeline-tests.component.html',
  styleUrls: ['./pipeline-tests.component.css']
})
export class PipelineTestsComponent implements OnInit{


  pipeline ?: Pipeline;
  metadata ?: Metadata
  tests ?: Test[];

  faSpinner = faSpinner;
  loading = true;
  error = false;


  // tests ?: Tests
  constructor(private apiService: ArchigatorApiService,
              private apiservice: ApiService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.apiservice.getPipelineTests().subscribe(
        {next: (results: Test[]) => {
        this.tests = results;
        this.loading = false;
        console.log("loading ended");
        if (results.length == 0){
          this.error = true;
        }
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
