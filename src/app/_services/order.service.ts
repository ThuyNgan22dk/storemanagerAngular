import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../_models/order';
import { OrderDetail } from '../_models/order-detail';

const ORDER_API = "http://localhost:8080/api/order/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }


  getListOrder():Observable<any>{
    return this.http.get(ORDER_API, httpOptions);
  }

  getListOrderDetail(order_id: number):Observable<any>{
    return this.http.get(ORDER_API  + 'orderDetail/' + order_id, httpOptions);
  }

  setOrderState(id: number, state: number): Observable<any>{
    return this.http.put(ORDER_API  + id + '/' + state, httpOptions);
  }

  getListOrderByUser(username: string):Observable<any>{
    let params = new HttpParams();
    params = params.append('username',username);
    return this.http.get(ORDER_API + 'user',{params: params});

  }

  placeOrder(username: string,address: string,note:string,orderDetails: OrderDetail[]):Observable<any>{
    return this.http.post(ORDER_API +'create',{username, address, note, orderDetails},httpOptions);
  }
  // placeOrder(firstname: string,lastname:string,address: string,state:string,promotionCode: string,phone:string,email:string,note:string,orderDetails: OrderDetail[],username: string):Observable<any>{
  //   return this.http.post(ORDER_API +'create',{firstname,lastname,address,state,promotionCode,phone,email,note,orderDetails,username},httpOptions);
  // }
}
