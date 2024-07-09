import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StatusRequest} from "../shared/status-request";
import {Metadata, Pipeline, Project, Test, User} from "../shared/response";

import {environment} from '../../environments/environment'
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private   baseurl = 'http://localhost:8000/api/v1';
  private baseurl = environment.apiUrl;

  user ?: User;
  project ?: Project;
  pipeline ?: Pipeline;


  // @ts-ignore
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private ownerloadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);



  constructor(private httpClient: HttpClient) {
  }

  // public getStatus(){
  //   return this.httpClient.get<Response>(this.baseurl +'/status')
  // }

  public getOwner(){
    return this.httpClient.get(this.baseurl +'/info/owner')
  }

  public getPipelineTests(): Observable<Test[]>{
    return this.httpClient.get<Test[]>(this.baseurl +'/info/tests')
  }

  public getMetadata(){
    return this.httpClient.get<Metadata>(this.baseurl +'/info/metadata')
  }

  public getProject():Observable<any>{
    return this.httpClient.get(this.baseurl +'/info/project')
  }


  public getOrder(idToken: string):Observable<any>{
    return this.httpClient.get(this.baseurl +`/order/id/${idToken}`)
  }

  // public getStatuso(data:StatusRequest){
  //   return this.httpClient.post<Response[]>(this.baseurl +'/status', data)
  // }


  public publish_project(){
    return this.httpClient.post<any>(this.baseurl +'/publish', {}, {observe: "response"})
  }



  getUserData(): Observable<User> {
    return this.userSubject.asObservable();
  }

  fetchUserData(): void {
    console.log("fetching user data")
    this.ownerloadingSubject.next(true);
    this.httpClient.get<User>(this.baseurl +'/info/owner').subscribe(
        (data: User) => {
          this.userSubject.next(data);
          console.log("user data", data)
          this.ownerloadingSubject.next(false);
        },
        (error) => {
          console.log('Error fetching user data:', error);
          this.ownerloadingSubject.next(false)
        }
    );
  }

  getLoadingState(): Observable<boolean> {
    return this.ownerloadingSubject.asObservable();
  }

}
