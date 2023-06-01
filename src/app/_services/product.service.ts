import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const PRODUCT_API = "http://localhost:8080/api/product/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getListProduct():Observable<any>{
    return this.http.get(PRODUCT_API,httpOptions);
  }

  getListProductForUser():Observable<any>{
    return this.http.get(PRODUCT_API + 'foruser',httpOptions);
  }

  getListProductNewest(num: number):Observable<any>{
    return this.http.get(PRODUCT_API + 'newest/' + num,httpOptions);
  }

  getListProductByPrice():Observable<any>{
    return this.http.get(PRODUCT_API + 'price',httpOptions);
  }

  getListRelatedProduct(id: number):Observable<any>{
    return this.http.get(PRODUCT_API + 'related/' + id,httpOptions);
  }

  getListProductByCategory(id: number):Observable<any>{
    return this.http.get(PRODUCT_API + 'category/' + id,httpOptions);
  }

  // getListProductByCategory(id: number):Observable<any>{
  //   return this.http.get(PRODUCT_API + 'category/' + id,httpOptions);
  // }

  searchProduct(keyword: string):Observable<any>{
    let params = new HttpParams();
    params = params.append('keyword',keyword)
    return this.http.get(PRODUCT_API + 'search',{params: params});
  }

  getListByPriceRange(id: number, min:number, max: number):Observable<any>{
    let params = new HttpParams();
    params = params.append('id',id);
    params = params.append('min',min);
    params = params.append('max',max);
    return this.http.get(PRODUCT_API + 'range',{params: params})
  }

  getProduct(id: number):Observable<any>{
    return this.http.get(PRODUCT_API + id,httpOptions);
  }

  createProduct(productname:string,description:string,origin:string,unit:string,price: number,categoryId: number,imageIds: Array<string>):Observable<any>{
    return this.http.post(PRODUCT_API +'create',{productname,description,origin,unit,price,categoryId,imageIds},httpOptions);
  }

  updateProduct(id: number,productname:string,description:string,origin:string,unit:string,price: number,categoryId: number,imageIds: Array<string>):Observable<any>{
    return this.http.put(PRODUCT_API + 'update/'+id,{productname,description,origin,unit,price,categoryId,imageIds},httpOptions);
  }

  deleteProduct(id:number):Observable<any>{
    return this.http.delete(PRODUCT_API + 'delete/' + id,httpOptions);
  }


}
