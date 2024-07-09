import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';


import {faCircleLeft, faUser, faArrowLeft, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {Metadata, User} from "../shared/response";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  faCircleLeft = faCircleLeft;
  faUser = faUser;
  faArrowLeft = faArrowLeft;

  faSpinner = faSpinner;
  spinLoader = false;
  loading = true;


  user ?: User;


  constructor(private apiservice: ApiService,
              private location: Location) {
  }


  ngOnInit() {

    this.apiservice.getUserData().subscribe(
      {
        next: (data: User) => {
          this.user = data;
          this.loading = false;
        },
        error: (error: any) => {
          console.error(error);
          this.loading=false;
          // this.error = true;
        }

      }
    );

  }

  goBack(): void {
    this.location.back();
  }
}
