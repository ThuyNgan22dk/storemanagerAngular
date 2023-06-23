import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImportGood } from '../_models/import-good';
import { ImportDetail } from '../_models/import-detail';

const IMPORT_API = "http://localhost:8080/api/import/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  constructor(private http: HttpClient) { }


  getListImport():Observable<any>{
    return this.http.get(IMPORT_API,httpOptions);
  }

  // getListImportByUser(username: string):Observable<any>{
  //   let params = new HttpParams();
  //   params = params.append('username',username);
  //   return this.http.get(IMPORT_API + 'user',{params: params});
  // }

  updateImport(id: number,nameShipper: string, phoneShipper: string, note: string,totalPrice: number,importDetails: ImportDetail[]):Observable<any>{
    return this.http.put(IMPORT_API + 'update/' + id, {nameShipper,phoneShipper,note,totalPrice,importDetails} ,httpOptions);
  }

  placeImport(nameShipper: string, phoneShipper: string, note: string,totalPrice: number,importDetails: ImportDetail[]):Observable<any>{
    return this.http.post(IMPORT_API +'create',{nameShipper, phoneShipper, totalPrice, note, importDetails},httpOptions);
  }

  deleteImport(id: number):Observable<any>{
    return this.http.delete(IMPORT_API + 'delete/' + id, httpOptions);
  }

  getListImportDetail(importGoodId: number):Observable<any>{
    if(importGoodId != 0){
      return this.http.get(IMPORT_API + 'importDetail/' +  importGoodId,httpOptions);
    } else{
      return this.http.get(IMPORT_API + 'importDetail',httpOptions);
    }
  }

  // getListDates():Observable<any>{
  //   return this.http.get(IMPORT_API + 'listDate', httpOptions);
  // }
  
  // getListTotalForChart(dates: any):Observable<any>{
  //   let params = new HttpParams();
  //   params = params.append('dates', dates);
  //   return this.http.get(IMPORT_API + 'listTotal',{params: params});
  // }

  getTotalImport():Observable<any>{
    return this.http.get(IMPORT_API + 'totalImport', httpOptions);
  
  }

  getTotalDayImport(date: string):Observable<any>{
    return this.http.get(IMPORT_API + 'totalDay/' + date, httpOptions);
  }

  createImportDetail(name: string, price: number, quantity: number, expiry: string,importGoodId: number): Observable<any>{
    return this.http.post(IMPORT_API + 'importDetail/create', {name,price,quantity,expiry,importGoodId},httpOptions);
  }

  updateImportDetail(id: number,name: string, price: number, quantity: number, expiry: string,importGoodId: number): Observable<any>{
    return this.http.put(IMPORT_API + 'importDetail/update/' + id, {name,price,quantity,expiry,importGoodId},httpOptions);
  }

  deleteImportDetail(id: number):Observable<any>{
    return this.http.delete(IMPORT_API + 'importDetail/delete/' + id, httpOptions);
  }
}
