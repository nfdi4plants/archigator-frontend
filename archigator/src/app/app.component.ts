import {Component, OnInit, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StatusRequest} from "./shared/status-request";
import {ArchigatorApiService} from "./archigator-api.service";
import { Observable} from "rxjs";
import { first } from 'rxjs/operators';
import {Response} from "./shared/response";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppComponent implements OnInit {
  title = 'archigator';

  signature: string | undefined;
  paramsObject: object | undefined;

  request: StatusRequest | any;

  data_object: any

  status: Observable<Response> | undefined;

  // const status_request = new StatusRequest();

  constructor(private route: ActivatedRoute,
              private apiService: ArchigatorApiService) {
  }

  // getStatus(status: StatusRequest) {
  //   console.log("status", status)
  //   return this.apiService.generateLink(status).subscribe((data: {}) => {
  //     this.data_object = data;
  //   })
  // }


  ngOnInit() {}

}
