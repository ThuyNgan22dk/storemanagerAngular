import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const PROMOTION_API = "http://localhost:8080/api/promotion/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  constructor(private http: HttpClient) { }

  getListPromotion():Observable<any>{
    return this.http.get(PROMOTION_API,httpOptions);
  }

  getListPromotionEnabled(){
    return this.http.get(PROMOTION_API + 'enabled',httpOptions);
  }

  getPromotionByCode(code: string){
    // console.log(PROMOTION_API + 'findCode/' + code);
    return this.http.get(PROMOTION_API + 'findCode/' + code,httpOptions);
  }

  createPromotion(name: string,detail: string,quantity: number,percent: number){
    return this.http.post(PROMOTION_API + 'create',{name,detail,quantity,percent},httpOptions);
  }

  updatePromotion(id: number, name: string,detail: string,code: string, quantity: number,percent: number){
    return  this.http.put(PROMOTION_API + 'update/' + id,{name,detail,code,quantity,percent},httpOptions);
  }

  enablePromotion(id: number){
    return this.http.put(PROMOTION_API + 'enable/'+ id,httpOptions);
  }

  deletePromotion(id:number){
    return this.http.delete(PROMOTION_API + 'delete/'+ id,httpOptions);
  }
}
