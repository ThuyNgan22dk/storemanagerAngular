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

  getListStateByOrderId(order_id: number):Observable<any>{
    return this.http.get(ORDER_API + 'orderState/' + order_id, httpOptions);
  }

  getTotalOrder():Observable<any>{
    return this.http.get(ORDER_API + 'totalOrder', httpOptions);
  }
  
  getTotalDayOrder(date: string):Observable<any>{
    return this.http.get(ORDER_API + 'totalDay/' + date, httpOptions);
  }

  getListDates():Observable<any>{
    return this.http.get(ORDER_API + 'listDate', httpOptions);
  }
  
  getListTotalForChart(dates: any):Observable<any>{
    let params = new HttpParams();
    params = params.append('dates', dates);
    return this.http.get(ORDER_API + 'listTotal',{params: params});
  }

  setOrderState(id: number, state: number): Observable<any>{
    return this.http.put(ORDER_API  + id + '/' + state, httpOptions);
  }

  getListOrderByUser(username: string):Observable<any>{
    let params = new HttpParams();
    params = params.append('username',username);
    return this.http.get(ORDER_API + 'user',{params: params});
  }

  // placeOrder(username: string,address: string,promotionCode: string,note:string,orderDetails: OrderDetail[]):Observable<any>{
  //   return this.http.post(ORDER_API +'create',{username, address,promotionCode, note, orderDetails},httpOptions);
  // }
  placeOrder(username: string,firstname: string,lastname:string,phone:string,country: string,address: string,promotionCode: string,note:string,orderDetails: OrderDetail[]):Observable<any>{
    return this.http.post(ORDER_API +'create',{username,firstname,lastname,phone,country,address,promotionCode,note,orderDetails},httpOptions);
  }
}
