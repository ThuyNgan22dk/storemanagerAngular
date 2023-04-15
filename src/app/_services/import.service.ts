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
}
