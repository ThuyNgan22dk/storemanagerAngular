import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const CART_API = "http://localhost:8080/api/cart/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CartService {

  items : any[] =[];

  totalPrice =0;

  total = 0;

  constructor(private http: HttpClient) { }

  getItems(username: string):Observable<any>{
    return this.http.get(CART_API + username,httpOptions);
  }

  addToCart(username: string, name: string, quantity: number):Observable<any>{
    return this.http.post(CART_API + 'create',{username, name, quantity},httpOptions);
  }

  updateProduct(id: number, quantity: number):Observable<any>{
    return  this.http.put(CART_API + 'update/' + id + '/' + quantity,httpOptions);
  }

  deleteProduct(id:number):Observable<any>{
    return this.http.delete(CART_API + 'delete/'+ id ,httpOptions);
  }

  saveCart():void{
    localStorage.setItem('cart_items',JSON.stringify(this.items));
  }

  // addToCart(item: any,quantity: number){
  //   this.loadCart();
  //   if(!this.productInCart(item)){
  //     item.quantity = quantity;
  //     item.subTotal = item.quantity * item.price;
  //     this.items.push(item)
  //   }else{
  //     this.items.forEach(res => {
  //       if(res.id == item.id){
  //         res.quantity += quantity;
  //         res.subTotal = res.quantity * res.price;
  //       }
  //     });
  //   }
  //   item.quantity = quantity;
  //   this.saveCart();
  //   this.getTotalPrice();

  // }


  updateCart(item:any,quantity: number){
    this.items.forEach(res =>{
      if(res.id == item.id){
        res.quantity = quantity;
        res.subTotal = res.quantity * res.price;
      }
    })
    this.saveCart();
    this.getTotalPrice( this.items);
  }


  productInCart(item: any):boolean{
    return this.items.findIndex((x:any) => x.id == item.id) > -1;
  }

  loadCart():void{
    // this.getItems();
    // this.getTotalPrice();
  }

  // getItems() {
  //   return this.items;
  //   this.getTotalPrice();
  // }



  getTotalPrice(items: any[]){
    this.totalPrice = 0;
    this.total = 0;
    items.forEach(res =>{
      this.totalPrice += res.total;
      this.total = this.totalPrice;
    })
    return this.totalPrice;
  }

  // remove(item: any){
  //   const index = this.items.findIndex((o:any) => o.id == item.id);
  //   if(index > -1){
  //     this.items.splice(index,1);
  //     this.saveCart();
  //   }
  //   this.getTotalPrice();
  // }

  clearCart(){
    this.items = [];
    // this.getTotalPrice( this.items);
    localStorage.removeItem('cart_items');
  }

}
