import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const CART_API = "http://192.168.0.6:8080/api/cart/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) { }

  getItems(username: string):Observable<any>{
    return this.http.get(CART_API + username,httpOptions);
  }

  addToCart(username: string, name: string, quantity: number):Observable<any>{
    return this.http.post(CART_API + 'create',{username, name, quantity},httpOptions);
  }

  productAvailableOnCart(username: string, name: string, quantity: number, quantityAdd: number):Observable<any>{
    return this.http.put(CART_API + 'changeProduct',{username, name, quantity, quantityAdd},httpOptions);
  }

  updateProduct(id: number, quantity: number):Observable<any>{
    return  this.http.put(CART_API + 'update/' + id + '/' + quantity,httpOptions);
  }

  deleteProduct(id:number, username: string):Observable<any>{
    return this.http.delete(CART_API + 'delete/'+ username + '/' + id ,httpOptions);
  }
}
