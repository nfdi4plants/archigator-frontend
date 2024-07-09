import { Injectable } from '@angular/core';
import {HttpClient, HttpHandler, HttpRequest} from "@angular/common/http";
import {BehaviorSubject, filter, Observable, take} from "rxjs";
import {OAuthService} from "angular-oauth2-oidc";

interface QueuedRequest {
  request: () => Observable<any>;
  originalRequest: HttpRequest<any>;
}


@Injectable({
  providedIn: 'root'
})
export class ApiQueueService {

  // private queue: Array<() => Observable<any>> = [];
  private queue: QueuedRequest[] = [];
  private isProcessingQueue = false;
  private authenticationComplete = new BehaviorSubject<boolean>(false);



  constructor(private http: HttpClient, private httpHander: HttpHandler,
              private oauthService: OAuthService) { }

  // enqueue(request: () => Observable<any>): void {
  //   this.queue.push(request);
  //   if (!this.isProcessingQueue) {
  //     this.processQueue();
  //   }
  //
  // }

  enqueue(request: () => Observable<any>, originalRequest: HttpRequest<any>): void {
    // @ts-ignore
    this.queue.push({ request, originalRequest });
    if (!this.isProcessingQueue) {
      this.processQueue();
    }
  }


  processQueue_bak(): void {

    if (this.isProcessingQueue || !this.authenticationComplete.getValue()) {
      console.log("queue stopped")
      return;
    }

    this.isProcessingQueue = true;

    console.log("queue length", this.queue, this.queue.length)

    while (this.queue.length > 0) {
      console.log("in while loop")
      const nextRequest = this.queue.shift();

      // @ts-ignore
      nextRequest.request()?.subscribe(
        () => {
          // Processed successfully
          this.isProcessingQueue = false;
          if (this.queue.length > 0) {
            // Process next request if queue is not empty
            this.processQueue();
          }
        },
        () => {
          // Error occurred, stop processing and clear the queue
          this.isProcessingQueue = false;
          this.queue.length = 0;
        }
      );
    }




    // this.authenticationComplete
    //   .pipe(
    //     filter(authenticated => authenticated),
    //     take(1)
    //   )
    //   .subscribe(() => {
    //     if (this.queue.length > 0) {
    //       const nextRequest = this.queue.shift();
    //       // @ts-ignore
    //       nextRequest()?.subscribe(
    //         () => {
    //           this.processQueue();
    //         },
    //         () => {
    //           this.processQueue();
    //         }
    //       );
    //     } else {
    //       this.isProcessingQueue = false;
    //     }
    //   });
  }


  processQueue(): void {
    if (this.isProcessingQueue || !this.authenticationComplete.getValue()) {
      return;
    }

    console.log("queue length", this.queue, this.queue.length)

    this.isProcessingQueue = true;

    while (this.queue.length > 0) {
      const queuedRequest = this.queue.shift();

      console.log("req", queuedRequest);

      // @ts-ignore
      const { request, originalRequest } = queuedRequest;

      // Update the headers with the access token
      const accessToken = this.getAccessToken();
      console.log("here acces token", this.getAccessToken())
      const modifiedRequest = originalRequest.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
          Publication: 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0X25hbWUiOiJJbnZlbmlvVGVzdGluZyIsInByb2plY3RfaWQiOjc0fQ.41e8BF7XWDHxHxfuvt5NEHVe3NkqOVEBRSOX_7jI_yg'
        }
      });

      // console.log("modifieing headers")
      // originalRequest.headers.set(
      //     'Authorization', `Bearer ${accessToken}`,
      //     'Publication', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0X25hbWUiOiJJbnZlbmlvVGVzdGluZyIsInByb2plY3RfaWQiOjc0fQ.41e8BF7XWDHxHxfuvt5NEHVe3NkqOVEBRSOX_7jI_yg'
      // );


      this.http.request(modifiedRequest)?.subscribe(
        () => {
          // Processed successfully
          this.isProcessingQueue = false;
          if (this.queue.length > 0) {
            // Process next request if queue is not empty
            this.processQueue();
          }
        },
        () => {
          // Error occurred, stop processing and clear the queue
          this.isProcessingQueue = false;
          this.queue.length = 0;
        }
      );
    }
  }

  private getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }


  authenticationCompleted(): void {
    this.authenticationComplete.next(true);
    this.processQueue();
  }

}
