import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  private paramsSubject = new BehaviorSubject<any>(null);

  private publicationToken = new BehaviorSubject<any>(null);
  publicationToken$ = this.publicationToken.asObservable();

  constructor() { }


  // Method to set the parameters
  setParams(params: any): void {
    this.paramsSubject.next(params);
  }

  // Method to get the parameters as an Observable
  getParams(): Observable<any> {
    return this.paramsSubject.asObservable();
  }

  setPublication(token: any): void {
    console.log("setting publiaction token", token)
    this.publicationToken.next(token);
  }

  getPublication(): Observable<any> {
    console.log("returning publication token", this.publicationToken.asObservable())
    return this.publicationToken.asObservable();
  }

}
