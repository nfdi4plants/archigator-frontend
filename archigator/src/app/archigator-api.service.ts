import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from './shared/response';
import { StatusRequest } from './shared/status-request';

import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchigatorApiService {
  baseurl = 'http://localhost:8000/api/v1';


  // @ts-ignore
  private _link = new BehaviorSubject<Response>(new Response());
  public link = this._link.asObservable();



  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };



  // GET
  // POST
  createStatus(data: StatusRequest): Observable<Response> {
    console.log("get status")
    return this.http
        .post<Response>(
            this.baseurl + '/status',
            JSON.stringify(data),
            this.httpOptions
        )
        .pipe(retry(1), catchError(this.errorHandl));
  }

  createStatus2(data: StatusRequest): Observable<Response> {
    console.log("get status")
    return this.http
      .post<Response>(
        this.baseurl + '/status',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  generateLink(data:StatusRequest) {
    console.log("in generate link", data)
    return this.http.post<Response>(this.baseurl +'/status', data)
      .pipe(map(link => {
        this._link.next(link);
        return link;
      }));
  }


  // Error handling
  errorHandl(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
