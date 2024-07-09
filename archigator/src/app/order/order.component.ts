import { Component, OnInit } from '@angular/core';
import {PublishResponse, Order} from "../shared/response";
import {DatashareService} from "../services/datashare.service";
import {NavigationEnd, Router} from "@angular/router";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

// test order: http://localhost:4200/order?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0X2lkIjoxMywicmVxdWVzdF9pZCI6IjA2ZmU0MWI3LTc2YWEtNGVhOC1hNTExLWI4OGYwNzIzOWQ1ZSJ9.praq7GCUMMgZFVVn9zszKRNgJV8n2RYXDned3dg90i0
// https://codepen.io/stoumann/pen/vYJavdK
// http://localhost:8000/publish/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0X25hbWUiOiJJbnZlbmlvVGVzdGluZyIsInByb2plY3RfaWQiOjc0fQ.41e8BF7XWDHxHxfuvt5NEHVe3NkqOVEBRSOX_7jI_yg

export class OrderComponent implements OnInit{

  order?: Order;

  error = false;

  stepcolor = false

  commentsLoading = true;


  constructor(private datashare: DatashareService,
              private router: Router,
              private apiservice: ApiService) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });

    console.log("receipt loaded")
    this.datashare.order$.subscribe((data) => {
      console.log("ddb", data)
      this.order = data;

    })

    const token = this.getTokenFromURL() || null;
    console.log("now doing request", token)

    // @ts-ignore
    this.apiservice.getOrder(token).subscribe({
      next: (response: any) => {

        console.log("---")
        console.log("res", response)
        // if (response.status === 201) {
        //   console.log("success")
        //   // console.log(response.body)
        //   // this.publish_response = response
        //   // console.log("body", response.body)
        //
        //   console.log("bla", response.body)
        //   this.datashare.updatePublish(response.body)
        //   this.router.navigate(["/receipt"]);
        //   // setTimeout(()=>this.datashare.publish.next(response.body), 1000);
        // }
        // this.datashare.updateOrder(response.body)
        this.order = response;

        if (this.order?.status == "accepted" || this.order?.status == "submitted") {
          console.log("stepcolor set to true ")
          this.stepcolor = true;
        }

        console.log(this.order?.status)

        // @ts-ignore
        for (const comment of this.order?.comments) {
          console.log(comment);
        }

        // this.addHtmlCode()
      },
      error: (error: any) => {
        console.error("api error", error);
        this.error = true;
      }
    });



  }


  closeTab() {
    console.log("close tab")
    window.close();
  }

  toDataHub() {
    if (this.order && this.order.web_url) {
      window.location.href = this.order.web_url;
    }

  }



  private getTokenFromURL(): String | null {
    const urlSearchParams = new URLSearchParams(window.location.search);
    console.log("token is", urlSearchParams.get("publication"));
    return urlSearchParams.get("publication");
  }



}
