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
    return this.http.get(ORDER_API,httpOptions);
  }


  getListOrderByUser(username: string):Observable<any>{
    let params = new HttpParams();
    params = params.append('username',username);
    return this.http.get(ORDER_API + 'user',{params: params});

  }

  placeOrder(firstname: string,lastname:string,address: string,state:string,promotionCode: string,phone:string,email:string,note:string,orderDetails: OrderDetail[],username: string):Observable<any>{
    return this.http.post(ORDER_API +'create',{firstname,lastname,address,state,promotionCode,phone,email,note,orderDetails,username},httpOptions);
  }
}
