import { Injectable } from '@angular/core';
import {PublishResponse, Order} from "../shared/response";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DatashareService {


  // publish: Subject<PublishResponse> = new Subject<PublishResponse>();

  // @ts-ignore
  private publishSubject = new BehaviorSubject<PublishResponse>(null);
  publish$ = this.publishSubject.asObservable();

  // @ts-ignore
  private orderSubject = new BehaviorSubject<Order>(null);
  order$ = this.orderSubject.asObservable();

  constructor() { }

  updatePublish(publish: PublishResponse) {
    this.publishSubject.next(publish);
  }


  updateOrder(order: Order) {
    this.orderSubject.next(order);
  }


}
